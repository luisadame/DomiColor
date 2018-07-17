// Scss
import '../scss/main.scss';
// Scripts
import Utils from './utils';
import Vue from 'vue/dist/vue.js';
import ColorComponent from './components/Color.vue';

class DomiColor {
    constructor() {
        this.parentGrid = document.querySelector('.container');
        this.container = document.querySelector('.image');
        this.imageCanvas = document.querySelector('.image__canvas');
        this.imageInput = document.querySelector('.image__input');
        this.$image__border = document.querySelector('.image__border');
        this.$palette = document.querySelector('.palette');
        this.$colors = document.querySelectorAll('.color');
        this.imageIsPortrait = false;
        this.containerDimensions = [this.container.offsetWidth, this.container.offsetHeight];
        this.events = [{
                'handler': e => this.read(e.target.files[0]).bind(this),
                'element': this.imageInput,
                'event': 'input'
            },
            {
                'handler': event => {
                    event.stopPropagation();
                    event.preventDefault();
                    this.$image__border.classList.add('active');
                },
                'element': document.querySelector('.image__label'),
                'event': 'dragenter'
            },
            {
                'handler': event => {
                    this.$image__border.classList.remove('active');
                    event.stopPropagation();
                    event.preventDefault();
                },
                'element': document.querySelector('.image__label'),
                'event': 'dragleave'
            },
            {
                'handler': e => {e.stopPropagation(); e.preventDefault();},
                'element': document.querySelector('.image__label'),
                'event': 'dragover'
            },
            {
                'handler': this.dropImage.bind(this),
                'element': document.querySelector('.image__label'),
                'event': 'drop'
            },
            {
                'handler': this.showImage.bind(this),
                'element': this.imageCanvas,
                'event': 'load'
            },
            {
                'handler': this.resizeImage.bind(this),
                'element': window,
                'event': 'resize'
            },
            {
                'handler': this.containerTransition.bind(this),
                'element': this.container,
                'event': 'transitionend'
            }
        ];
    }

    isPortraitAndBigScreen() {
        return window.innerWidth > 760 && this.imageIsPortrait;
    }

    containerTransition() {
        this.imageCanvas.style.opacity = 1
    }

    copyColor(e) {
        Utils.selectText(e.target);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        console.log('Copied!');
    }

    resizeImage() {
        if(this.isPortraitAndBigScreen()) {
            this.container.classList.remove('landscape');
            this.container.classList.add('portrait');
        } else {
            this.container.classList.remove('portrait');
            this.container.classList.add('landscape');
        }
    }

    showImage() {
        this.container.classList.add('active');
        this.imageIsPortrait = Utils.getRatio(this.imageCanvas) < 1;
        this.resizeImage();
    }

    dropImage(e) {
        e.stopPropagation();
        e.preventDefault();
        // Validate it is a image
        const file = e.dataTransfer.files[0];
        if(file.type !== "image/jpeg" && file.type !== "image/png") {
            alert('File type not supported.');
            return false;
        }
        this.$image__border.classList.remove('active');
        this.read(file);
    }

    read(file) {
        const reader = new FileReader();
        reader.onload = data => {
            const src = data.target.result;
            this.imageCanvas.style.opacity = 0;
            this.imageCanvas.src = src;
            let v = Vibrant.from(src).useQuantizer(Vibrant.Quantizer.WebWorker);
            v.getPalette().then(this.processPalette.bind(this));
        };
        reader.readAsDataURL(file);
    }

    createColorElement([name, color]) {
        let colorComponent = Vue.extend(ColorComponent);
        let colorElement = new colorComponent({
            propsData: {title: name, color: color}
        });
        colorElement.$mount();
        return colorElement;
    }

    processPalette(palette) {
        let swatches = Object.entries(palette).filter(swatch => swatch[1] != null);
        let fragment = document.createDocumentFragment();
        swatches.forEach(swatch =>
                fragment.appendChild(this.createColorElement(swatch).$el)
        );
        this.$palette.innerHTML = "";
        this.$palette.appendChild(fragment);
        this.$palette.style.opacity = 1;
    }

    run() {
        this.events.forEach(event => {
            event.element.addEventListener(event.event, event.handler);
        });
    }
}
const domicolor = new DomiColor();
domicolor.run();
