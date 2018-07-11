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
            }
        ];
    }

    showImage() {
        this.parentGrid.style.gridTemplateColumns = "auto 1fr";
        this.imageCanvas.classList.add('active');
        let [width, height] = this.containerDimensions;

        if(Utils.getRatio(this.imageCanvas) < 1) {
            this.container.style.height = `${Utils.getRatio(this.imageCanvas, true) * width}px`;
            this.parentGrid.style.gridTemplateColumns = "35% 1fr";
            this.container.style.width = "100%";
        } else {
            this.container.style.width = `${Utils.getRatio(this.imageCanvas) * height}px`;
            this.container.style.height = "60%";
        }
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
    }

    run() {
        this.events.forEach(event => {
            event.element.addEventListener(event.event, event.handler);
        })
    }
}
const domicolor = new DomiColor();
domicolor.run();
