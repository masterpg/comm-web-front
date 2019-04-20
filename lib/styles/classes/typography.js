import {css} from 'lit-element'

const literal = css`
  .comm-font-common-base,
  .comm-font-display4,
  .comm-font-display3,
  .comm-font-display2,
  .comm-font-display1,
  .comm-font-headline,
  .comm-font-title,
  .comm-font-subhead2,
  .comm-font-subhead1,
  .comm-font-body2,
  .comm-font-body1,
  .comm-font-caption,
  .comm-font-menu,
  .comm-font-button,
  .comm-font-code2,
  .comm-font-code1 {
    font-family: 'Roboto', 'Noto', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .comm-font-common-code {
    font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
    -webkit-font-smoothing: antialiased;
  }

  .comm-font-common-nowrap,
  .comm-font-display4,
  .comm-font-display3,
  .comm-font-title,
  .comm-font-caption,
  .comm-font-menu,
  .comm-font-button {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .comm-font-display4 {
    font-size: 112px;
    font-weight: 300;
    letter-spacing: -0.044em;
    line-height: 120px;
  }

  .comm-font-display3 {
    font-size: 56px;
    font-weight: 400;
    letter-spacing: -0.026em;
    line-height: 60px;
  }

  .comm-font-display2 {
    font-size: 45px;
    font-weight: 400;
    letter-spacing: -0.018em;
    line-height: 48px;
  }

  .comm-font-display1 {
    font-size: 34px;
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 40px;
  }

  .comm-font-headline {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -0.012em;
    line-height: 32px;
  }

  .comm-font-title {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
  }

  .comm-font-subhead2 {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  .comm-font-subhead1 {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  .comm-font-body2 {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
  }

  .comm-font-body1 {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }

  .comm-font-caption {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.011em;
    line-height: 20px;
  }

  .comm-font-menu {
    font-size: 13px;
    font-weight: 500;
    line-height: 24px;
  }

  .comm-font-button {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.018em;
    line-height: 24px;
    text-transform: uppercase;
  }

  .comm-font-code2 {
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
  }

  .comm-font-code1 {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`

export default literal
