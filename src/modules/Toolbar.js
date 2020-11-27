import IconAlignLeft from 'quill/assets/icons/align-left.svg';
import IconAlignCenter from 'quill/assets/icons/align-center.svg';
import IconAlignRight from 'quill/assets/icons/align-right.svg';
import Garbage from '../assets/garbage.svg';
import Edit from '../assets/edit.svg';
import Link from '../assets/link-symbol.svg';
import { BaseModule } from './BaseModule';



export class Toolbar extends BaseModule {

    constructor(...args){
      super(...args)
      this.Parchment = window.Quill.imports.parchment;
      this.FloatStyle = new this.Parchment.Attributor.Style('float', 'float');
      this.MarginStyle = new this.Parchment.Attributor.Style('margin', 'margin');
      this.DisplayStyle = new this.Parchment.Attributor.Style('display', 'display');
    }
    

    onCreate = () => {
		// Setup Toolbar
        this.toolbar = document.createElement('div');
        Object.assign(this.toolbar.style, this.options.toolbarStyles);
        this.overlay.appendChild(this.toolbar);

        // Setup Buttons
        this._defineAlignments();
        this._addToolbarButtons();
    };

	// The toolbar and its children will be destroyed when the overlay is removed
    onDestroy = () => {};

	// Nothing to update on drag because we are are positioned relative to the overlay
    onUpdate = () => {};

    _defineAlignments = () => {
        this.alignments = [
            {
                icon: IconAlignLeft,
                apply: () => {
                    this.DisplayStyle.add(this.img, 'inline');
                    this.FloatStyle.add(this.img, 'left');
                    this.MarginStyle.add(this.img, '0 1em 1em 0');
                },
                isApplied: () => this.FloatStyle.value(this.img) == 'left',
            },
            {
                icon: IconAlignCenter,
                apply: () => {
                    this.DisplayStyle.add(this.img, 'block');
                    this.FloatStyle.remove(this.img);
                    this.MarginStyle.add(this.img, 'auto');
                },
                isApplied: () => this.MarginStyle.value(this.img) == 'auto',
            },
            {
                icon: IconAlignRight,
                apply: () => {
                    this.DisplayStyle.add(this.img, 'inline');
                    this.FloatStyle.add(this.img, 'right');
                    this.MarginStyle.add(this.img, '0 0 1em 1em');
                },
                isApplied: () => this.FloatStyle.value(this.img) == 'right',
            },
            {
                icon: Garbage,
                apply: () => {
                    window.Quill.find(this.img).deleteAt(0);
                },
                isApplied: () => window.Quill.find(this.img) == null,
            },
            {
                icon: Edit,
                apply: () => {
                    this.options.changeImage(this.img, this.overlay)
                },
                isApplied: () => window.Quill.find(this.img) == null,
            },
            {
                icon: Link,
                apply: () => {
                    let blot = this.Parchment.find(this.img);
                    this.options.openLinkModal(blot, this.img);
                },
                isApplied: () => window.Quill.find(this.img) == null,
            },
        ];
    };

    _addToolbarButtons = () => {
		const buttons = [];
		this.alignments.forEach((alignment, idx) => {
			const button = document.createElement('span');
			buttons.push(button);
			button.innerHTML = alignment.icon;
			button.addEventListener('click', () => {
					// deselect all buttons
				buttons.forEach(button => button.style.filter = '');
				if (alignment.isApplied()) {
						// If applied, unapply
					this.FloatStyle.remove(this.img);
					this.MarginStyle.remove(this.img);
					this.DisplayStyle.remove(this.img);
				}				else {
						// otherwise, select button and apply
					this._selectButton(button);
					alignment.apply();
				}
					// image may change position; redraw drag handles
				this.requestUpdate();
			});
			Object.assign(button.style, this.options.toolbarButtonStyles);
			if (idx > 0) {
				button.style.borderLeftWidth = '0';
			}
			Object.assign(button.children[0].style, this.options.toolbarButtonSvgStyles);
			if (alignment.isApplied()) {
				this._selectButton(button);
			}
			this.toolbar.appendChild(button);
		});
    };

    _selectButton = (button) => {
		button.style.filter = 'invert(20%)';
    };

}
