import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, observe, property, query, listen } from '@polymer/decorators';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior';
import { TimelineLite } from 'gsap';
import '../../styles/base-styles';

@customElement('comm-image')
export class CommImage extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="base-styles">
        /* デフォルト配置は左詰め */
        :host {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-start);
            @apply(--layout-center-justified);
          };
        }

        :host([align="left"]) {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-start);
            @apply(--layout-center-justified);
          };
        }

        :host([align="center"]) {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-center-center);
          };
        }

        :host([align="right"]) {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-end);
            @apply(--layout-center-justified);
          };
        }

        #container {
          box-sizing: border-box;
          height: 100%;
          position: relative;
          @apply(--comm-image-align);
        }

        #loading {
          width: 100%;
          height: 100%;
          top: 0;
          position: absolute;
        }

        #img {
          max-width: var(--comm-image-max-width);
          max-height: var(--comm-image-max-height);
        }

        .spinner {
          margin: 80px auto;
          width: 20px;
          height: 20px;
          position: relative;
          text-align: center;

          animation: sk-rotate 2.0s infinite linear;
        }

        .dot1, .dot2 {
          width: 60%;
          height: 60%;
          display: inline-block;
          position: absolute;
          top: 0;
          background-color: var(--comm-grey-500);
          border-radius: 100%;

          animation: sk-bounce 2.0s infinite ease-in-out;
        }

        .dot2 {
          top: auto;
          bottom: 0;
          animation-delay: -1.0s;
        }

        @keyframes sk-rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes sk-bounce {
          0%, 100% {
            transform: scale(0.0);
          }
          50% {
            transform: scale(1.0);
          }
        }
      </style>

      <div id="container">
        <div id="loading" class="layout vertical center-center">
          <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
          </div>
        </div>
        <img id="img" on-load="m_imgOnLoad">
      </div>
    `;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  @query('#container')
  m_container!: HTMLDivElement;

  @query('#img')
  m_img!: HTMLImageElement;

  @query('#loading')
  m_loading!: HTMLDivElement;

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  @property({ type: String })
  src: string = '';

  @observe('src')
  m_srcChanged(newValue, oldValue) {
    this.src = newValue ? newValue : '';
    if (this.m_img) {
      this.m_loading.hidden = false;
      this.m_loading.style.opacity = '1';
      this.m_img.hidden = false;
      this.m_img.style.opacity = '0';
      this.m_img.style.width = 'initial';
      this.m_img.style.height = 'initial';
      this.m_img.src = this.src;
    }
  }

  @property({ type: String })
  alt: string = '';

  @observe('alt')
  m_altChanged(newValue, oldValue) {
    this.alt = newValue;
    if (this.m_img) {
      this.m_img.alt = newValue;
    }
  }

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  ready() {
    super.ready();

    this.addEventListener('iron-resize', (e) => this.m_onIronResize(e));

    this.m_loading.hidden = true;
    this.m_img.alt = this.alt;
    this.m_img.src = this.src;
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  /**
   * コンポーネントのリサイズ処理を行います。
   */
  m_resize(): void {
    const containerWidth = this.m_getWidth(this.m_container);
    const containerHeight = this.m_getHeight(this.m_container);
    const imgStyle = getComputedStyle(this.m_img);

    // ①: 画像本来のサイズよりimgの縦横両方がともに大きい場合
    if (this.m_img.naturalWidth < this.m_img.width || this.m_img.naturalHeight < this.m_img.height) {
      // console.log('① - 0:',
      //   'img.naturalWidth:', this.m_img.naturalWidth, '< img.width:', this.m_img.width,
      //   '|| img.naturalHeight:', this.m_img.naturalHeight, '< img.height:', this.m_img.height);

      // コンテナのサイズと画像本来のサイズが同じまたはそれより小さい場合
      if (containerWidth >= this.m_img.naturalWidth && containerHeight >= this.m_img.naturalHeight) {
        // console.log('① - 1:',
        //   'container.width:', containerWidth, '>= img.naturalWidth:', this.m_img.naturalWidth,
        //   '&& containerHeight:', containerHeight, '>= img.naturalHeight:', this.m_img.naturalHeight);

        // imgを画像本来のサイズに設定
        this.m_img.style.width = 'initial';
        this.m_img.style.height = 'initial';
        return;
      }
    }

    // ②: コンテナよりimgの縦横どちらかの方が大きい場合
    if (this.m_img.width > containerWidth || this.m_img.height > containerHeight) {
      // この計算式の説明:
      //   img.naturalHeight : img.naturalWidth = container.width : container.height
      //        (1500px)     :      (800px)     =     (1000px)    :        (x)
      //   1500x = 800 * 1000
      //       x = 533.333…
      const x = (this.m_img.naturalHeight * containerWidth) / this.m_img.naturalWidth;

      if (x <= containerHeight) {
        // console.log('② - 1:', 'container.height(x)', x, '<= container.height', containerHeight);
        this.m_img.style.width = '100%';
        this.m_img.style.height = 'initial';
      } else {
        // console.log('② - 2:', 'container.height(x)', x, '> container.height', containerHeight);
        this.m_img.style.width = 'initial';
        this.m_img.style.height = '100%';
      }
    }
  }

  /**
   * 現在のimgのアスペクト比を取得します。
   */
  m_getCurrentAspect(): number {
    const num = this.m_img.width / this.m_img.height;
    return num;
  }

  /**
   * 画像本来のアスペクト比を取得します。
   */
  m_getOriginalAspect(): number {
    const num = this.m_img.naturalWidth / this.m_img.naturalHeight;
    return num;
  }

  m_getWidth(element: HTMLElement): number {
    const style = getComputedStyle(element);
    return element.clientWidth - this.m_parseInt(style.paddingLeft) - this.m_parseInt(style.paddingRight);
  }

  m_getHeight(element: HTMLElement): number {
    const style = getComputedStyle(element);
    return element.clientHeight - this.m_parseInt(style.paddingTop) - this.m_parseInt(style.paddingBottom);
  }

  m_parseInt(value): number {
    if (!value || value === '') {
      return 0;
    }

    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      return 0;
    }

    return parsedValue;
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  m_onIronResize(event) {
    this.m_resize();
  }

  m_imgOnLoad(event) {
    this.m_resize();

    const timeline = new TimelineLite();
    timeline.to(this.m_img, 1, { opacity: 1 }).to(
      this.m_loading,
      1,
      {
        opacity: 0,
        onComplete: () => {
          this.m_loading.hidden = true;
        },
      },
      0,
    );
  }
}
