import '@polymer/polymer/polymer-legacy.js'
import {html} from '@polymer/polymer/lib/utils/html-tag.js'

const template = html`
  <dom-module id="comm-colors">
    <template>
      <style>
        :host {
          /* Material Design color palette from online spec document */

          --comm-red-50: #ffebee;
          --comm-red-100: #ffcdd2;
          --comm-red-200: #ef9a9a;
          --comm-red-300: #e57373;
          --comm-red-400: #ef5350;
          --comm-red-500: #f44336;
          --comm-red-600: #e53935;
          --comm-red-700: #d32f2f;
          --comm-red-800: #c62828;
          --comm-red-900: #b71c1c;
          --comm-red-a100: #ff8a80;
          --comm-red-a200: #ff5252;
          --comm-red-a400: #ff1744;
          --comm-red-a700: #d50000;

          --comm-pink-50: #fce4ec;
          --comm-pink-100: #f8bbd0;
          --comm-pink-200: #f48fb1;
          --comm-pink-300: #f06292;
          --comm-pink-400: #ec407a;
          --comm-pink-500: #e91e63;
          --comm-pink-600: #d81b60;
          --comm-pink-700: #c2185b;
          --comm-pink-800: #ad1457;
          --comm-pink-900: #880e4f;
          --comm-pink-a100: #ff80ab;
          --comm-pink-a200: #ff4081;
          --comm-pink-a400: #f50057;
          --comm-pink-a700: #c51162;

          --comm-purple-50: #f3e5f5;
          --comm-purple-100: #e1bee7;
          --comm-purple-200: #ce93d8;
          --comm-purple-300: #ba68c8;
          --comm-purple-400: #ab47bc;
          --comm-purple-500: #9c27b0;
          --comm-purple-600: #8e24aa;
          --comm-purple-700: #7b1fa2;
          --comm-purple-800: #6a1b9a;
          --comm-purple-900: #4a148c;
          --comm-purple-a100: #ea80fc;
          --comm-purple-a200: #e040fb;
          --comm-purple-a400: #d500f9;
          --comm-purple-a700: #aa00ff;

          --comm-deep-purple-50: #ede7f6;
          --comm-deep-purple-100: #d1c4e9;
          --comm-deep-purple-200: #b39ddb;
          --comm-deep-purple-300: #9575cd;
          --comm-deep-purple-400: #7e57c2;
          --comm-deep-purple-500: #673ab7;
          --comm-deep-purple-600: #5e35b1;
          --comm-deep-purple-700: #512da8;
          --comm-deep-purple-800: #4527a0;
          --comm-deep-purple-900: #311b92;
          --comm-deep-purple-a100: #b388ff;
          --comm-deep-purple-a200: #7c4dff;
          --comm-deep-purple-a400: #651fff;
          --comm-deep-purple-a700: #6200ea;

          --comm-indigo-50: #e8eaf6;
          --comm-indigo-100: #c5cae9;
          --comm-indigo-200: #9fa8da;
          --comm-indigo-300: #7986cb;
          --comm-indigo-400: #5c6bc0;
          --comm-indigo-500: #3f51b5;
          --comm-indigo-600: #3949ab;
          --comm-indigo-700: #303f9f;
          --comm-indigo-800: #283593;
          --comm-indigo-900: #1a237e;
          --comm-indigo-a100: #8c9eff;
          --comm-indigo-a200: #536dfe;
          --comm-indigo-a400: #3d5afe;
          --comm-indigo-a700: #304ffe;

          --comm-blue-50: #e3f2fd;
          --comm-blue-100: #bbdefb;
          --comm-blue-200: #90caf9;
          --comm-blue-300: #64b5f6;
          --comm-blue-400: #42a5f5;
          --comm-blue-500: #2196f3;
          --comm-blue-600: #1e88e5;
          --comm-blue-700: #1976d2;
          --comm-blue-800: #1565c0;
          --comm-blue-900: #0d47a1;
          --comm-blue-a100: #82b1ff;
          --comm-blue-a200: #448aff;
          --comm-blue-a400: #2979ff;
          --comm-blue-a700: #2962ff;

          --comm-light-blue-50: #e1f5fe;
          --comm-light-blue-100: #b3e5fc;
          --comm-light-blue-200: #81d4fa;
          --comm-light-blue-300: #4fc3f7;
          --comm-light-blue-400: #29b6f6;
          --comm-light-blue-500: #03a9f4;
          --comm-light-blue-600: #039be5;
          --comm-light-blue-700: #0288d1;
          --comm-light-blue-800: #0277bd;
          --comm-light-blue-900: #01579b;
          --comm-light-blue-a100: #80d8ff;
          --comm-light-blue-a200: #40c4ff;
          --comm-light-blue-a400: #00b0ff;
          --comm-light-blue-a700: #0091ea;

          --comm-cyan-50: #e0f7fa;
          --comm-cyan-100: #b2ebf2;
          --comm-cyan-200: #80deea;
          --comm-cyan-300: #4dd0e1;
          --comm-cyan-400: #26c6da;
          --comm-cyan-500: #00bcd4;
          --comm-cyan-600: #00acc1;
          --comm-cyan-700: #0097a7;
          --comm-cyan-800: #00838f;
          --comm-cyan-900: #006064;
          --comm-cyan-a100: #84ffff;
          --comm-cyan-a200: #18ffff;
          --comm-cyan-a400: #00e5ff;
          --comm-cyan-a700: #00b8d4;

          --comm-teal-50: #e0f2f1;
          --comm-teal-100: #b2dfdb;
          --comm-teal-200: #80cbc4;
          --comm-teal-300: #4db6ac;
          --comm-teal-400: #26a69a;
          --comm-teal-500: #009688;
          --comm-teal-600: #00897b;
          --comm-teal-700: #00796b;
          --comm-teal-800: #00695c;
          --comm-teal-900: #004d40;
          --comm-teal-a100: #a7ffeb;
          --comm-teal-a200: #64ffda;
          --comm-teal-a400: #1de9b6;
          --comm-teal-a700: #00bfa5;

          --comm-green-50: #e8f5e9;
          --comm-green-100: #c8e6c9;
          --comm-green-200: #a5d6a7;
          --comm-green-300: #81c784;
          --comm-green-400: #66bb6a;
          --comm-green-500: #4caf50;
          --comm-green-600: #43a047;
          --comm-green-700: #388e3c;
          --comm-green-800: #2e7d32;
          --comm-green-900: #1b5e20;
          --comm-green-a100: #b9f6ca;
          --comm-green-a200: #69f0ae;
          --comm-green-a400: #00e676;
          --comm-green-a700: #00c853;

          --comm-light-green-50: #f1f8e9;
          --comm-light-green-100: #dcedc8;
          --comm-light-green-200: #c5e1a5;
          --comm-light-green-300: #aed581;
          --comm-light-green-400: #9ccc65;
          --comm-light-green-500: #8bc34a;
          --comm-light-green-600: #7cb342;
          --comm-light-green-700: #689f38;
          --comm-light-green-800: #558b2f;
          --comm-light-green-900: #33691e;
          --comm-light-green-a100: #ccff90;
          --comm-light-green-a200: #b2ff59;
          --comm-light-green-a400: #76ff03;
          --comm-light-green-a700: #64dd17;

          --comm-lime-50: #f9fbe7;
          --comm-lime-100: #f0f4c3;
          --comm-lime-200: #e6ee9c;
          --comm-lime-300: #dce775;
          --comm-lime-400: #d4e157;
          --comm-lime-500: #cddc39;
          --comm-lime-600: #c0ca33;
          --comm-lime-700: #afb42b;
          --comm-lime-800: #9e9d24;
          --comm-lime-900: #827717;
          --comm-lime-a100: #f4ff81;
          --comm-lime-a200: #eeff41;
          --comm-lime-a400: #c6ff00;
          --comm-lime-a700: #aeea00;

          --comm-yellow-50: #fffde7;
          --comm-yellow-100: #fff9c4;
          --comm-yellow-200: #fff59d;
          --comm-yellow-300: #fff176;
          --comm-yellow-400: #ffee58;
          --comm-yellow-500: #ffeb3b;
          --comm-yellow-600: #fdd835;
          --comm-yellow-700: #fbc02d;
          --comm-yellow-800: #f9a825;
          --comm-yellow-900: #f57f17;
          --comm-yellow-a100: #ffff8d;
          --comm-yellow-a200: #ffff00;
          --comm-yellow-a400: #ffea00;
          --comm-yellow-a700: #ffd600;

          --comm-amber-50: #fff8e1;
          --comm-amber-100: #ffecb3;
          --comm-amber-200: #ffe082;
          --comm-amber-300: #ffd54f;
          --comm-amber-400: #ffca28;
          --comm-amber-500: #ffc107;
          --comm-amber-600: #ffb300;
          --comm-amber-700: #ffa000;
          --comm-amber-800: #ff8f00;
          --comm-amber-900: #ff6f00;
          --comm-amber-a100: #ffe57f;
          --comm-amber-a200: #ffd740;
          --comm-amber-a400: #ffc400;
          --comm-amber-a700: #ffab00;

          --comm-orange-50: #fff3e0;
          --comm-orange-100: #ffe0b2;
          --comm-orange-200: #ffcc80;
          --comm-orange-300: #ffb74d;
          --comm-orange-400: #ffa726;
          --comm-orange-500: #ff9800;
          --comm-orange-600: #fb8c00;
          --comm-orange-700: #f57c00;
          --comm-orange-800: #ef6c00;
          --comm-orange-900: #e65100;
          --comm-orange-a100: #ffd180;
          --comm-orange-a200: #ffab40;
          --comm-orange-a400: #ff9100;
          --comm-orange-a700: #ff6500;

          --comm-deep-orange-50: #fbe9e7;
          --comm-deep-orange-100: #ffccbc;
          --comm-deep-orange-200: #ffab91;
          --comm-deep-orange-300: #ff8a65;
          --comm-deep-orange-400: #ff7043;
          --comm-deep-orange-500: #ff5722;
          --comm-deep-orange-600: #f4511e;
          --comm-deep-orange-700: #e64a19;
          --comm-deep-orange-800: #d84315;
          --comm-deep-orange-900: #bf360c;
          --comm-deep-orange-a100: #ff9e80;
          --comm-deep-orange-a200: #ff6e40;
          --comm-deep-orange-a400: #ff3d00;
          --comm-deep-orange-a700: #dd2c00;

          --comm-brown-50: #efebe9;
          --comm-brown-100: #d7ccc8;
          --comm-brown-200: #bcaaa4;
          --comm-brown-300: #a1887f;
          --comm-brown-400: #8d6e63;
          --comm-brown-500: #795548;
          --comm-brown-600: #6d4c41;
          --comm-brown-700: #5d4037;
          --comm-brown-800: #4e342e;
          --comm-brown-900: #3e2723;

          --comm-grey-50: #fafafa;
          --comm-grey-100: #f5f5f5;
          --comm-grey-200: #eeeeee;
          --comm-grey-300: #e0e0e0;
          --comm-grey-400: #bdbdbd;
          --comm-grey-500: #9e9e9e;
          --comm-grey-600: #757575;
          --comm-grey-700: #616161;
          --comm-grey-800: #424242;
          --comm-grey-900: #212121;

          --comm-blue-grey-50: #eceff1;
          --comm-blue-grey-100: #cfd8dc;
          --comm-blue-grey-200: #b0bec5;
          --comm-blue-grey-300: #90a4ae;
          --comm-blue-grey-400: #78909c;
          --comm-blue-grey-500: #607d8b;
          --comm-blue-grey-600: #546e7a;
          --comm-blue-grey-700: #455a64;
          --comm-blue-grey-800: #37474f;
          --comm-blue-grey-900: #263238;
        }
      </style>
    </template>
  </dom-module>
`
template.setAttribute('style', 'display: none;')
document.head.appendChild(template.content)
