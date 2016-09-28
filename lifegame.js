//记录棋盘上各细胞的位置信息，如位于map[0][0]处的细胞对应的pos为pos(0, 0)
function pos(i, j)
{
	this.row = i;
	this.col = j;

	this.get_row = function()
	{
		return this.row;
	};

	this.get_col= function()
	{
		return this.col;
	};

	this.set_row= function(value)
	{
		this.row = value;
	};

	this.set_col= function(value)
	{
		this.col = value;
	};
}

//棋盘对象
function life_map(size)
{
	this.map = [];
	this.mapsize = size;
	this.poslist = [];
	this.ui_map_list = [];
	this.record_map = [];
	this.per_border_width = 0;
	this.interval = 0;
	this.to_change_list = [];
	this.ispause = false;

	this.create_list = function()
	{
		var i = 0;
		var j = 0;

		//将棋盘上所有细胞对应的pos对象置入poslist数组中
		for(i = 0; i < this.mapsize; i++)
		{
			for(j = 0; j < this.mapsize; j++)
			{
				var temp = new pos(i, j);
				this.poslist.push(temp);
			}
		}

		return this.poslist;
	};

	this.set_interval = function(in_interval)
	{
		this.interval = in_interval;
	};

	//将map中的细胞状态同步到ui界面上，具体表现为方格的黑白颜色变化
	this.match_ui_array = function()
	{
		var i = 0;

		for(i = 0; i < this.to_change_list.length; i++)
		{
			var temppos = this.to_change_list[i];
			if(this.map[temppos.row][temppos.col].get_status() == 0 && this.record_map[temppos.row][temppos.col].get_status() == 1)
			{				
				//$("#" + myid).fadeOut(this.interval);
				this.ui_map_list[temppos.row][temppos.col].style.background = "black";
			}
			else if(this.map[temppos.row][temppos.col].get_status() == 1 && this.record_map[temppos.row][temppos.col].get_status() == 0)
			{
				//$("#" + myid).fadeIn(this.interval);
				this.ui_map_list[temppos.row][temppos.col].style.background = "white";
			}			
		}

		this.to_change_list = [];
	};

	//为map中每个细胞创建一个对应的div，并将所有div对应地存在数组ui_map_list以便改变ui上方格状态
	this.ui_map_create = function(mapsize)
	{
		var i = 0;
		var j = 0;
		this.ui_map_list = new Array();

		for(i = 0; i < mapsize; i++)
		{
			this.ui_map_list[i] = new Array();
			for(j = 0; j < mapsize; j++)
			{
				this.ui_map_list[i][j] = null;
			}				
		}

		for(i = 0; i < mapsize; i++)
		{
			for(j = 0; j < mapsize; j++)
			{
				var newDiv = document.createElement("div");			
				newDiv.style.cssText = "width: " + this.per_border_width + "px;height: " + this.per_border_width + "px;position: absolute;top:" + i * this.per_border_width + "px;left: " + j * this.per_border_width + "px;margin: 0px;padding: 0px;text-align:center;background-color:white;";
				newDiv.setAttribute("class", "grids");
				document.body.appendChild(newDiv);

				this.ui_map_list[i][j] = newDiv;
			}
		}
	};

	//初始化map中所有细胞，并随机使live_num个细胞为生
	this.init_map = function(live_num)
	{
		this.per_border_width = parseInt(window.innerHeight / this.mapsize);	
		//console.log(window.innerHeight);
		var i = 0;
		var j = 0;

		for(i = 0; i < this.mapsize; i++)
		{
			var list = [];
			for(j = 0; j < this.mapsize; j++)
			{
				var tceil = new ceil(i, j);
				tceil.set_status(0);
				list.push(tceil);
			}
			this.map.push(list);
		}

		this.ui_map_create(this.mapsize);
		this.create_list();

		for(i = 0; i < live_num; i++)
		{
			var index = Math.floor(Math.random() * this.poslist.length);
			var temppos = this.poslist.pop();

			//若要变为生的细胞不在poslist末尾，则将其余末尾pos对象交换，然后删除列尾元素
			if(this.poslist.length != index)
			{
				var temprow = temppos.get_row();
				var tempcol = temppos.get_col();

				temppos.set_row(this.poslist[index].get_row());
				temppos.set_col(this.poslist[index].get_col());

				this.poslist[index].set_row(temprow);
				this.poslist[index].set_col(tempcol);
			}

			this.set_ceil_status(temppos.get_row(), temppos.get_col(), 1);
		}

		for(i = 0; i < this.mapsize; i++)
		{
			var templist = [];
			for(j = 0; j < this.mapsize; j++)
			{
				var rceil = new ceil(i, j);
				rceil.set_status(this.map[i][j].get_status());
				templist.push(rceil);
			}
			this.record_map.push(templist);
		}

		//将初始化为死的细胞的对应的div的背景色设为黑
		for(i = 0; i < this.mapsize; i++)
		{
			for(j = 0; j < this.mapsize; j++)
			{				
				if(this.map[i][j].get_status() == 0)
				{
					this.ui_map_list[i][j].style.background = "black";
					//$("#" + (i * this.mapsize + j)).fadeOut(500);
				}
			}
		}

		//this.print_self();	
	};

	this.get_ceil_status = function(row, col, mymap)
	{
		return mymap[row][col].get_status();
	};

	this.set_ceil_status = function(row, col, value)
	{
		this.map[row][col].set_status(value);
	};

	this.change_ceil_status = function(row, col, oldmap)
	{
		var around_status = this.get_around_status(row, col, oldmap);

		if(around_status == 3)
		{
			if(this.map[row][col].get_status() != 1)            //若状态发生改变，则将其加入更新列表中
			{
				this.to_change_list.push(new pos(row, col));
			}
			this.set_ceil_status(row, col, 1);
		}
		else if(around_status != 2)
		{
			if(this.map[row][col].get_status() != 0)
			{
				this.to_change_list.push(new pos(row, col));
			}
			this.set_ceil_status(row, col, 0);
		}
	};

	//对所求细胞周围8个细胞的status求和，所得即周围存活的细胞总数
	this.get_around_status = function(row, col, oldmap)
	{
		return this.get_ceil_status((row + this.mapsize - 1) % this.mapsize, (col + this.mapsize - 1) % this.mapsize, oldmap) 
				+ this.get_ceil_status((row + this.mapsize - 1) % this.mapsize, col, oldmap) 
				+ this.get_ceil_status((row + this.mapsize - 1) % this.mapsize, (col + 1) % this.mapsize, oldmap)
				+ this.get_ceil_status(row, (col + this.mapsize - 1) % this.mapsize, oldmap)
				+ this.get_ceil_status(row, (col + 1) % this.mapsize, oldmap)
				+ this.get_ceil_status((row + 1) % this.mapsize, (col + this.mapsize - 1) % this.mapsize, oldmap) 
				+ this.get_ceil_status((row + 1) % this.mapsize, col, oldmap) 
				+ this.get_ceil_status((row + 1) % this.mapsize, (col + 1) % this.mapsize, oldmap);

	};

	this.update_map = function()
	{
		if(this.ispause == true)
		{
			return;
		}

		var i = 0;
		var j = 0;

		for(i = 0; i < this.mapsize; i++)
		{
			for(j = 0; j < this.mapsize; j++)
			{
				this.record_map[i][j].set_status(this.map[i][j].get_status());
			}
		}

		for(i = 0; i < this.mapsize; i++)
		{
			for(j = 0; j < this.mapsize; j++)
			{
				this.change_ceil_status(i, j, this.record_map);
			}
		}

		//console.log(this.to_change_list);

		this.match_ui_array();
		//this.print_self();
	};


	/*this.print_self = function()
	{
		var i = 0;
		var j = 0;
		for(i = 0; i < this.mapsize; i++)
		{
			var tempstr = "";
			for(j = 0; j < this.mapsize; j++)
			{
				tempstr += this.map[i][j].get_status();
				tempstr += " ";
			}
			console.log(tempstr, "\n");
		}
	};*/
}

//definition of object ceil
function ceil(myrow, mycol)
{
	this.status = 0;
	this.row = myrow;
	this.col = mycol;

	this.set_status = function(new_status)
	{
		this.status = new_status;
	};

	this.get_status = function()
	{
		return this.status;
	};

	this.get_row = function()
	{
		return this.row;
	};

	this.get_col = function()
	{
		return this.col;
	};
}

var game_timer = {
	update_interval : 1000,
	mapsize : 4,
	live_num : 8,
	timer : null,
	gamemap: null,

	init : function(size, num, interval)
	{
		this.update_interval = interval;
		this.mapsize = size;
		this.live_num = num;
		this.gamemap = new life_map(this.mapsize);
		this.gamemap.init_map(this.live_num);
		this.gamemap.set_interval(this.update_interval / 5);
	},
	
	start_timer : function()
	{
		this.timer = setInterval("game_timer.call_timer_function()", this.update_interval);
	},

	call_timer_function : function()
	{
		this.gamemap.update_map();
	},

	game_pause : function()
	{
		this.gamemap.ispause = true;
	},

	game_continue : function()
	{
		this.gamemap.ispause = false;
	},
};

document.getElementById("submit").onclick = function(){
	clearInterval(game_timer.timer);
	game_timer.timer = null;
	var mapsize = parseInt(document.getElementById("size").value);
	var live_num = parseInt(document.getElementById("livenum").value);

	var sets = document.getElementById("settings");
	sets.style.right = 0;
	sets.style.bottom = 0;

	//document.getElementById("settings").style.display = "";

	game_timer.init(mapsize, live_num, 100);
	game_timer.start_timer();
};
	
document.getElementById("pause").onclick = function(){
	if(game_timer.gamemap == null)
	{
		return;
	}
	if(document.getElementById("pause").value == "暂停")
	{
		game_timer.game_pause();
		document.getElementById("pause").value = "继续";
	}
	else
	{
		game_timer.game_continue();
		document.getElementById("pause").value = "暂停";
	}
};


