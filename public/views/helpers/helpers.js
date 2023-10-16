'use strict';

/* eslint-disable @typescript-eslint/no-explicit-any */
'use script';

import moment from 'moment';

const helper = {
	if_cond: (v1, operator, v2, options) => {
		switch (operator) {
			case '===':
				return v1 === v2 ? options.fn(this) : options.inverse(this);
			case '!==':
				return v1 !== v2 ? options.fn(this) : options.inverse(this);
			case '<':
				return v1 < v2 ? options.fn(this) : options.inverse(this);
			case '<=':
				return v1 <= v2 ? options.fn(this) : options.inverse(this);
			case '>':
				return v1 > v2 ? options.fn(this) : options.inverse(this);
			case '>=':
				return v1 >= v2 ? options.fn(this) : options.inverse(this);
			case '&&':
				return v1 && v2 ? options.fn(this) : options.inverse(this);
			case '||':
				return v1 || v2 ? options.fn(this) : options.inverse(this);
			default:
				return options.inverse(this);
		}
	},
	formatDate: function (date, format) {
		return moment(date).utc().format(format);
	},
	truncate: function (str, len) {
		if (str.length > len && str.length > 0) {
			let new_str = str + ' ';
			new_str = str.substring(0, len);
			new_str = str.substring(0, new_str.lastIndexOf(' '));
			new_str = new_str.length > 0 ? new_str : str.substring(0, len);
			return new_str + '...';
		}
		return str;
	},
	stripTags: function (input) {
		return input.replace(/<(?:.|\n)*?>/gm, '');
	},
	editIcon: function (blogUser, loggedUser, blogId, floating = true) {
		if (blogUser._id.toString() == loggedUser._id.toString()) {
			if (floating) {
				return /*html*/ `<a href="/blogs/edit/${blogId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
			} else {
				return /*html*/ `<a href="/blogs/edit/${blogId}"><i class="fas fa-edit"></i></a>`;
			}
		} else {
			return '';
		}
	},
	select: function (selected, options) {
		return options
			.fn(this)
			.replace(
				new RegExp(' value="' + selected + '"'),
				'$& selected="selected"'
			)
			.replace(
				new RegExp('>' + selected + '</option>'),
				'selected="selected" $&'
			);
	}
};

export default helper;
