describe('pos', function(){
	it('sould be a function', function(){
		assert.isFunction(pos);
	});
	it('should have two arguments', function(){
		assert.equal(pos.length, 2);
	});
	context('test get_row', function(){
		it('should has function get_row', function(){
			var test_pos = new pos(0, 1);
			assert.isFunction(test_pos.get_row);
		});
		it('should has function get_row that return row', function(){
			var test_pos = new pos(0, 1);
			assert.equal(test_pos.get_row(), 0);
		});	
	});
	context('test get_col', function(){
		it('should has function get_col', function(){
			var test_pos = new pos(0, 1);
			assert.isFunction(test_pos.get_col);
		});
		it('should has function get_col that return col', function(){
			var test_pos = new pos(0, 1);
			assert.equal(test_pos.get_col(), 1);
		});
	});
	context('test set_row', function(){
		it('should has function set_row', function(){
			var test_pos = new pos(0, 1);
			assert.isFunction(test_pos.set_row);
		});
		it('should has function set_row with one argument', function(){
			var test_pos = new pos(0, 1);
			assert.equal(test_pos.set_row.length, 1);
		});
		it('should has function set_row that set row', function(){
			var test_pos = new pos(0, 1);
			test_pos.set_row(2);
			assert.equal(test_pos.get_row(), 2);
		});		
	})
	context('test set_col', function(){
		it('should has function set_col', function(){
			var test_pos = new pos(0, 1);
			assert.isFunction(test_pos.set_col);
		});
		it('should has function set_col that set col', function(){
			var test_pos = new pos(0, 1);
			test_pos.set_col(2);
			assert.equal(test_pos.get_col(), 2);
		});
		it('should has function set_col with one argument', function(){
			var test_pos = new pos(0, 1);
			assert.equal(test_pos.set_col.length, 1);
		});
	});
	
});

describe('life_map', function(){
	it('should be a function', function(){
		assert.isFunction(life_map);
	});
	context('test create_list', function(){
		it('should has function create_list', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.create_list);
		});
		it('should return a list with all points pos messages', function(){
			var temp_map = new life_map(3);
			temp_map.create_list();
			assert.equal(temp_map.poslist.length, 9);
			assert.equal(temp_map.poslist[0].get_row(), 0);
			assert.equal(temp_map.poslist[0].get_col(), 0);
			assert.equal(temp_map.poslist[8].get_row(), 2);
			assert.equal(temp_map.poslist[8].get_col(), 2);
		});
	});
	context('test set_interval', function(){
		it('should has function set_interval', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.set_interval);
		});
		it('should has 1 argument', function(){
			var temp_map = new life_map(4);
			assert.equal(temp_map.set_interval.length, 1);
		});
	});
	
	it('should has function match_ui_array', function(){
		var temp_map = new life_map(4);
		assert.isFunction(temp_map.match_ui_array);
	});

	context('test ui_map_create', function(){
		it('should has function ui_map_create', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.ui_map_create);
		});
		it('should has 1 argument', function(){
			var temp_map = new life_map(4);
			assert.equal(temp_map.ui_map_create.length, 1);
		});
	});
	
	context('test init_map', function(){
		it('should has function init_map', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.init_map);
		});
		it('should has 2 arguments', function(){
			var temp_map = new life_map(4);
			assert.equal(temp_map.init_map.length, 1);
		});
		it('should fill the map with ceils', function(){
			var temp_map = new life_map(3);
			temp_map.init_map(9);
			assert.equal(temp_map.map[0][0].get_status(), 1);
		});
	});
	context('test get_ceil_status', function(){
		it('should has function get_ceil_status', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.get_ceil_status);
		})
		it('should has 3 arguments', function(){
			var temp_map = new life_map(4);
			assert.equal(temp_map.get_ceil_status.length, 3);
		});
		it('should return some ceil status', function(){
			var temp_map = new life_map(3);
			temp_map.init_map(9);
			assert.equal(temp_map.get_ceil_status(0, 0, temp_map.map), 1);
		});
	});
	context('test get_ceil_status', function(){
		it('should has function set_ceil_status', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.set_ceil_status);
		})
		it('should has 3 arguments', function(){
			var temp_map = new life_map(4);
			assert.equal(temp_map.set_ceil_status.length, 3);
		});
		it('should direct set some ceil status', function(){
			var temp_map = new life_map(3);
			temp_map.init_map(9);
			temp_map.set_ceil_status(0, 0, 0);
			assert.equal(temp_map.map[0][0].status, 0);
		});
	});
	context('test change_ceil_status', function(){
		it('should has function change_ceil_status', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.change_ceil_status);
		})
		it('should has 3 arguments', function(){
			var temp_map = new life_map(4);
			assert.equal(temp_map.change_ceil_status.length, 3);
		});
		it('should change some ceil status according to the status of 8 ceils around it', function(){
			var temp_map = new life_map(3);
			temp_map.init_map(0);
			temp_map.set_ceil_status(0, 0, 1);
			temp_map.set_ceil_status(0, 1, 1);
			temp_map.set_ceil_status(1, 2, 1);
			temp_map.change_ceil_status(0, 2, temp_map.map);
			assert.equal(temp_map.get_ceil_status(0, 2, temp_map.map), 1);
		});
	});
	context('test get_around_status', function(){
		it('should has function get_around_status', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.get_around_status);
		})
		it('should has 3 arguments', function(){
			var temp_map = new life_map(4);
			assert.equal(temp_map.get_around_status.length, 3);
		});
		it('should return the number of 1s around the ceil', function(){
			var temp_map = new life_map(3);
			temp_map.init_map(0);
			temp_map.set_ceil_status(0, 0, 1);
			temp_map.set_ceil_status(0, 1, 1);
			temp_map.set_ceil_status(1, 2, 1);
			assert.equal(temp_map.get_around_status(1, 1, temp_map.map), 3);
		});
	});
	context('test update_map', function(){
		it('should has function update_map', function(){
			var temp_map = new life_map(4);
			assert.isFunction(temp_map.update_map);
		})
		it('should set all ceils status in the map', function(){
			var temp_map = new life_map(3);
			temp_map.init_map(0);
			temp_map.set_ceil_status(0, 0, 1);
			temp_map.set_ceil_status(0, 1, 1);
			temp_map.set_ceil_status(1, 2, 1);     //bug
		});
	});
});

describe('ceil', function(){
	it('should be a function', function(){
		assert.isFunction(ceil);
	});
	it('should has 2 arguments', function(){
		assert.equal(ceil.length, 2);
	});
	context('test get_status', function(){
		it('should has function get_status', function(){
			var temp_ceil = new ceil(0, 1);
			assert.isFunction(temp_ceil.set_status);
		})
		it('should return ceil status', function(){
			var temp_ceil = new ceil(0, 1);
			assert.equal(temp_ceil.get_status(), 0);
		});
	});
	context('test set_status', function(){
		it('should has function set_status', function(){
			var temp_ceil = new ceil(0, 1);
			assert.isFunction(temp_ceil.set_status);
		})
		it('should has 1 arguments', function(){
			var temp_ceil = new ceil(0, 1);
			assert.equal(temp_ceil.set_status.length, 1);
		});
		it('should direct set ceil status', function(){
			var temp_ceil = new ceil(0, 1);
			temp_ceil.set_status(1);
			assert.equal(temp_ceil.get_status(), 1);
		});
	});
	context('test get_row', function(){
		it('should has function get_row', function(){
			var temp_ceil = new ceil(0, 1);
			assert.isFunction(temp_ceil.get_row);
		})
		it('should return row of the ceil', function(){
			var temp_ceil = new ceil(0, 1);
			assert.equal(temp_ceil.get_row(), 0);
		});
	});
	context('test get_col', function(){
		it('should has function get_col', function(){
			var temp_ceil = new ceil(0, 1);
			assert.isFunction(temp_ceil.get_col);
		})
		it('should return col of the ceil', function(){
			var temp_ceil = new ceil(0, 1);
			assert.equal(temp_ceil.get_col(), 1);
		});
	});
});

describe('game_timer', function(){
	it('should has function init', function(){
		assert.isFunction(game_timer.init);
	});
	it('should has 3 arguments', function(){
		assert.equal(game_timer.init.length, 3);
	});
	it('should finish init the map', function(){
		game_timer.init(3, 3, 100);
		assert.equal(game_timer.mapsize, 3);
		assert.equal(game_timer.live_num, 3);
		assert.equal(game_timer.update_interval, 100);
	});
	it('should has function call_timer_function', function(){
		assert.isFunction(game_timer.call_timer_function);
	});
	it('should has function game_pause', function(){
		assert.isFunction(game_timer.game_pause);
	});
	it('should has function game_continue', function(){
		assert.isFunction(game_timer.game_continue);
	});
});