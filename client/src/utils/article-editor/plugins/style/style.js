ArticleEditor.add('plugin', 'style', {
    translations: {
        en: {
            "style": {
                "style": "Style",
                "remove-style": "Remove Style"
            }
        }
    },
    defaults: {
        icon: '<svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m15 1c-3.5955345 2.88454776-5.25146525 9.6241453-7.87485347 9.6241453h-2.6253419l-2.62495116 4.3758547h-.87485347c1.75009768-5.25102559 6.33028189-14 14-14z"/></svg>'
    },
    init: function() {},
    start: function() {
        if (typeof this.opts.styles === 'undefined') return;
        var keys = Object.keys(this.opts.styles);
        if (keys.length === 0) return;

        this.app.toolbar.add('style', {
            title: '## style.style ##',
            icon: this.opts.style.icon,
            position: {
                after: 'format'
            },
            blocks: {
                types: keys
            },
            command: 'style.popup'
        });
    },
    popup: function(params, button) {
        var instance = this.app.block.get();
        var type = instance.getType();
        var classes = this._getClasses(type);
        var items = this._buildItems(this.opts.styles[type], instance);

        // popup
        this.app.popup.create('style', { items: items });
        this.app.popup.open({ button: button });
    },
    toggle: function(params) {
        this._toggle(params, false);
    },
    remove: function() {
        this._toggle();
    },

    // private
    _toggle: function(params, remove) {
        this.app.popup.close();

        var instance = this.app.block.get();
        var type = instance.getType();
        var $block = instance.getBlock();

        // remove
        this._removeStyles(instance, type);

        // set
        if (remove === false) {
            $block.addClass(params.classname);
        }

        // ui
        this.app.control.updatePosition();
    },
    _buildItems: function(styles, instance) {
        var items = {};
        var active = false;
        for (var key in styles) {
            items[key] = {
                title: styles[key].title,
                command: 'style.toggle',
                params: { classname: styles[key].classname }
            }

            if (this._hasClasses(instance, styles[key].classname)) {
                active = key;
            }
        }

        if (active) {
            items[active].active = true;
        }

        items['remove'] = {
            title: '## style.remove-style ##',
            divider: 'top',
            command: 'style.remove',
            hidden: (active === false)
        }

        return items;
    },
    _hasClasses: function(instance, classname) {
        var classes = classname.split(' ');
        return instance.hasClass(classes);
    },
    _getClasses: function(type) {
        var styles = this.opts.styles[type];
        var classes = [];
        for (var key in styles) {
            classes.push(styles[key].classname);
        }

        return classes;
    },
    _removeStyles: function(instance, type) {
        var classes = this._getClasses(type);
        var $block = instance.getBlock();

        $block.removeClass(classes.join(' '));
    }
});