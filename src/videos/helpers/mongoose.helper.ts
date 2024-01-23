import { Model } from 'mongoose';
import { QueryBuilderUtils } from './../utils/query-builder.util';
import * as _ from "lodash";

export class MongooseModelHelper {

	_model;

  constructor(model: Model<any>) {
    this._model = model;
  };

	private _generateQuery(params) {
		let query;

		// Get filters from query params
		const filters = QueryBuilderUtils.getFilters(params);

		let filterFn = {};
		if (filters.length > 0) {
			filterFn = { ["$and"]: filters };
		}

		// Create query using filters
		query = this._model.find(filterFn);
		if (params.sortBy) {
			query.sort({ viewCount: 1})
		}
		return query;
	}

	public async findAll(params) {
		const query = this._generateQuery(params);
		return query.exec();
	}
}