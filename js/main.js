// Scss
import '../scss/main.scss';

// Scripts
import Vue from 'vue/dist/vue.js';
import DomiColor from './Domicolor';
// ---------- //
new Vue({
    el: '.container',
    data: {
        about: false
    }
});

const domicolor = new DomiColor();
domicolor.run();
