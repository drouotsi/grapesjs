import { CommandObject } from './CommandAbstract';
import { createEl } from '../../utils/dom';

export default {
  open() {
    const { container, editor } = this;

    const id = 'views-container';
    const pn = editor.Panels;

    const panel =
      pn.getPanel(id) ||
      pn.addPanel({
        id,
      });

    panel.set('appendContent', container).trigger('change:appendContent');

    container.style.display = 'block';
  },

  close() {
    const { container } = this;

    if (container) {
      container.style.display = 'none';
    }
  },

  run(editor) {
    this.editor = editor;

    this.container = this.container || createEl('div');

    this.open();
  },

  stop() {
    this.close();
  },
} as CommandObject<{}, { [k: string]: any }>;
