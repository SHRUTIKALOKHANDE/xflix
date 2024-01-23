import { Types } from 'mongoose';

export class QueryBuilderUtils {

	public static getFilters(params) {
		const filters = [];
		Object.keys(params).forEach(key => {
			if (key !== 'sortBy') {
				const filterObj = {name: key, value: null, arr_value: [], operator: null};
				if (params[key].split(',').length > 1) {
					filterObj['arr_value'] = params[key].split(',');
					filterObj['operator'] = 'in';
				} else if (key === 'title') {
					filterObj['value'] = params[key];
					filterObj['operator'] = 'regex';
				} else if (key === 'contentRating') {
					filterObj['arr_value'] = this._getLowerRatings(params[key]);
					filterObj['operator'] = 'in';
				} else {
					filterObj['value'] = params[key];
					filterObj['operator'] = 'eq';
				}
				filters.push(this._getFilterObject(filterObj));
			}
		});
		return filters;
	}

	public static _getFilterObject(filterObj) {
		let filter = {};
		switch (filterObj.operator) {
			case 'in':
			case 'nin':
				filter = { [filterObj.name]: { ['$' + filterObj.operator]: filterObj.arr_value } };
				break;
			case 'regex':
				filterObj.value = filterObj.value.replace(/[()[\]\$?*+]/g, '\\$&');
				const exp = new RegExp(filterObj.value, 'i');
				filter = { [filterObj.name]: { ['$' + filterObj.operator]: exp} };
				break;
			default:
				filter = { [filterObj.name]: { ['$' + filterObj.operator]: filterObj.value } };
				break;
		}
		return filter;
	}

	public static _getLowerRatings = (rating) => {
		const allRatings = ["Anyone", "7+", "12+", "16+", "18+"];
		const index = allRatings.indexOf(rating);
		if (index !== -1) {
			return allRatings.slice(0, index + 1);
		} else {
			return [];
		}
	};

	public static _isValidObjectId = (id: string) => {
		return Types.ObjectId.isValid(id);
	}
}