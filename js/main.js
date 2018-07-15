// Scss
import '../scss/main.scss';
// Scripts
import Utils from './utils';

class DomiColor {
    constructor() {
        this.parentGrid = document.querySelector('.container');
        this.container = document.querySelector('.image');
        this.imageCanvas = document.querySelector('.image__canvas');
        this.imageInput = document.querySelector('.image__input');
        this.$image__border = document.querySelector('.image__border');
        this.$palette = document.querySelector('.palette');
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

    containerTransition(e) {
        console.log(e);
        this.imageCanvas.style.opacity = 1
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

    processPalette(palette) {
        let colors = Object.values(palette).filter(c => c!=null);
        let fragment = document.createDocumentFragment();
        colors.forEach(color => {
            let colorElement = document.createElement('div');
            colorElement.classList.add('color');
            colorElement.style.background = color.getHex();
            colorElement.style.color = color.getBodyTextColor();
            colorElement.innerText = color.getHex();
            fragment.appendChild(colorElement);
        });
        this.$palette.innerHTML = '';
        this.$palette.appendChild(fragment);
        this.$palette.style.opacity = 1;
    }

    run() {
        this.events.forEach(event => {
            event.element.addEventListener(event.event, event.handler);
        })
    }
}
const domicolor = new DomiColor();
domicolor.run();
