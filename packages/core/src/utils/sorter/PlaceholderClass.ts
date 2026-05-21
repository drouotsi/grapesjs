import { View } from '../../common';
import { Placement } from './types';
import Dimension from './Dimension';
import { RateLimiter } from './RateLimiter';

type PlaceHolderPosition = {
  elementDimension: Dimension;
  placement: Placement;
};

export type PlaceHolderElements = {
  rowElement: HTMLElement;
  columnElement: HTMLElement;
  innerElement: HTMLElement;
};

export const defaultPlaceholderElements = () => {
  const backgroundColor = 'rgba(0,0,0,0.1)';
  const border = '1px dashed rgba(0,0,0,0.2)';
  const rowElement = document.createElement('div');
  rowElement.style.height = '20px';
  rowElement.style.width = '100%';
  rowElement.style.background = backgroundColor;
  rowElement.style.border = border;

  const columnElement = document.createElement('div');
  columnElement.style.minWidth = '20px';
  columnElement.style.minHeight = '20px';
  columnElement.style.flexGrow = '1';
  columnElement.style.height = '100%';
  columnElement.style.background = backgroundColor;
  columnElement.style.border = border;

  const innerElement = document.createElement('div');
  innerElement.style.position = 'absolute';
  innerElement.style.padding = '10px';
  innerElement.style.background = backgroundColor;
  innerElement.style.border = border;

  return {
    rowElement,
    columnElement,
    innerElement,
  } as PlaceHolderElements;
};

export class PlaceholderClass extends View {
  pfx: string;
  allowNesting: boolean;
  container: HTMLElement;
  els!: PlaceHolderElements;
  offset: {
    top: number;
    left: number;
  };
  private moveLimiter: RateLimiter<PlaceHolderPosition>;

  constructor(options: {
    container: HTMLElement;
    pfx?: string;
    allowNesting?: boolean;
    els: PlaceHolderElements;
    offset: {
      top: number;
      left: number;
    };
  }) {
    super();
    this.pfx = options.pfx || '';
    this.allowNesting = options.allowNesting || false;
    this.container = options.container;
    this.els = {
      rowElement: options.els.rowElement as HTMLElement,
      columnElement: options.els.columnElement as HTMLElement,
      innerElement: options.els.innerElement as HTMLElement,
    };
    this.offset = {
      top: options.offset.top || 0,
      left: options.offset.left || 0,
    };

    // Initialize the RateLimiter with the moveThreshold
    this.moveLimiter = new RateLimiter<PlaceHolderPosition>(300);
  }

  show() {
    console.log('called placeholdershow');
    //this.el.style.display = 'block';
  }

  hide() {
    this.moveLimiter.clearTimeout();
    this._remove();
    //this.el.style.display = 'none';
  }

  private _remove() {
    Object.values(this.els).forEach((element) => {
      element.remove();
    });
  }

  /**
   * Updates the position of the placeholder with a movement threshold.
   * @param {Dimension} elementDimension element dimensions.
   * @param {Placement} placement either before or after the target.
   */
  move(elementDimension: Dimension, placement: Placement) {
    const position: PlaceHolderPosition = { elementDimension, placement };

    // Update the position arguments in the RateLimiter
    this.moveLimiter.updateArgs(position);

    // Execute the callback with a threshold
    this.moveLimiter.execute(({ elementDimension, placement }) => {
      this._move(elementDimension, placement);
    });
  }

  private _move(elementDimension: Dimension, placement: Placement) {
    const { el } = elementDimension;
    this._remove();
    const droppableTags = ['div', 'section', 'a']; // TODO: make it customizable
    if (el && placement == 'inside' && droppableTags.includes(el.tagName.toLowerCase()) && el.children.length === 0) {
      el.append(this.els.innerElement);
      return;
    }
    if (el && el.parentElement && droppableTags.includes(el.parentElement.tagName.toLowerCase())) {
      const parent = el.parentElement;
      let selectedElement: HTMLElement | null = null;
      const parentStyle = getComputedStyle(parent);
      if (parentStyle.display === 'flex' && parentStyle.flexDirection === 'row') {
        selectedElement = this.els.columnElement;
      } else {
        selectedElement = this.els.rowElement;
      }
      if (placement === 'before') {
        parent.insertBefore(selectedElement, el);
      } else {
        if (el.nextSibling) {
          parent.insertBefore(selectedElement, el.nextSibling);
        } else {
          parent.appendChild(selectedElement);
        }
      }
      return;
    }
  }

  /**
   * Sets the orientation of the placeholder based on the element dimensions.
   * @param {Dimension} elementDimension Dimensions of the element at the index.
   */
  private setOrientationForDimension(elementDimension?: Dimension) {
    this.el.classList.remove('vertical');
    this.el.classList.add('horizontal');

    if (elementDimension && !elementDimension.dir) {
      this.setOrientation('vertical');
    }
  }

  /**
   * Sets the placeholder's class to vertical.
   */
  private setOrientation(orientation: 'horizontal' | 'vertical') {
    this.el.classList.remove('horizontal');
    this.el.classList.remove('vertical');
    this.el.classList.add(orientation);
  }

  /**
   * Updates the CSS styles of the placeholder element.
   * @param {number} top Top position of the placeholder.
   * @param {number} left Left position of the placeholder.
   * @param {string} width Width of the placeholder.
   * @param {string} height Height of the placeholder.
   */
  private updateStyles(top: number, left: number, width: string, height: string) {
    //this.setElement(this.els.innerElement);
    this.els.innerElement.style.top = top + 'px';
    this.els.innerElement.style.left = left + 'px';
    if (width) this.els.innerElement.style.width = width;
    if (height) this.els.innerElement.style.height = height;
  }

  private adjustOffset() {
    this.$el.css('top', '+=' + this.offset.top + 'px');
    this.$el.css('left', '+=' + this.offset.left + 'px');
  }
}
