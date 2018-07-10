
/*header*/
	(function(){
		var $buy = $('#header .h_m_r_buy');
		var $buyA = $buy.find('a.buy');
		var $buyHide = $buy.find('.hide');
		$buy.hover(function(){
			$buyA.addClass('hover');
			$buyHide.stop().slideDown(300);
		},function(){
			$buyHide.stop().slideUp(300 , function(){
				$buyA.removeClass('hover');
			});
		});
	})();

/*nav_main*/
	(function(){
		var $product = $('#nav .n_main .product');
		var $hide = $('#nav .nav_hide');
		var $ul = $('#nav .nav_hide .n_h_main ul')
		$product.hover(function(){
			$hide.stop().slideDown();
			$ul.eq( $(this).index() ).show().siblings().hide();
		},function(){
			$hide.stop().slideUp();
		});
		$hide.hover(function(){
			$(this).stop().slideDown();
		},function(){
			$(this).stop().slideUp();
		});
	})();

/*nav-search*/
	(function(){
		var $input = $('#nav .n_search .n_s_input input');
		var $search = $('#nav .n_search');
		var $hide = $('#nav .n_search .hide');
		var $tip = $('#nav .n_search .n_s_input a.tip');
		$input.on('focus blur' , function(){
			$search.toggleClass('focus');
			$hide.fadeToggle(100);
			$tip.fadeToggle(200);
		});
	})();

/*banner main*/
	(function(){
		var $main = $('#banner .b_main');
		var $pic = $('#banner .b_main .b_m_pic li');
		var $tab = $('#banner .b_main .b_m_tab li');
		var $btn = $('#banner .b_main .b_m_btn .btn');
		var length = $pic.length;
		var index = 0;
		var timer = null;
		var nowTime = 0;
		$pic.eq(0).show();
		$tab.eq(0).addClass('on');

		$tab.click(function(){
			if ( new Date() - nowTime > 800 && index != $(this).index() )
			{
				nowTime = new Date();
				anim(function(){
					index = $(this).index();
				}.bind(this));
			}
		});
		$btn.click(function(){
			if ( new Date() - nowTime > 800 )
			{
				nowTime = new Date();
				var i = $(this).index();
				anim(function(){
					if ( i )
					{
						index++;
						index%=length;
					}else{
						index--;
						if(index<0)index=length-1;
					};
				});
			}
		});
		$main.hover(function(){clearInterval(timer)},auto);

		auto();
		function auto(){
			timer = setInterval(function(){
				anim(function(){
					index++;
					index%=length;
				});
			} , 5000);
		};
		function anim( fn ){
			$pic.eq(index).fadeOut(800);
			$tab.eq(index).removeClass('on');
			fn();
			$pic.eq(index).fadeIn(800);
			$tab.eq(index).addClass('on');
		};
	})();

/*banner-nav*/
	(function(){
		var $firstLi = $('#banner .b_nav .firstLi');
		var $info = $('#banner .b_nav .firstLi .info');
		$info.each(function(){
			var $li = $(this).find('li');
			var length = $li.length;
			var width = $li.width();
			var height = $li.height();
			var col = Math.ceil( length / 6 );
			$(this).width( col*width );
			$li.each(function(i){
				var x = Math.floor(i / 6);
				var y = i % 6;
				$(this).css({
					left : x*width + 'px',
					top : y*height + 'px'
				});
			});
		});
		$firstLi.hover(function(){
			$(this).find('.info').show();
		},function(){
			$(this).find('.info').hide();
		});
	})();

/*star*/
	(function(){
		var $btn = $('#star .s_btn span');
		var $show = $('#star .s_show');
		var timer = null;
		index = false;
		$btn.click(function(){
			var i = $(this).index();
			if ( !!i != index )
			{
				clearInterval(timer);
				index = !!i;
				$(this).removeClass('able').siblings().addClass('able');
				$show.stop().animate({
					marginLeft : -i*1226 + 'px'
				},500);
				auto();
			}
		});
		auto();
		function auto(){
			timer = setInterval(function (){
				index = !index;
				var x = index-0;
				$btn.eq(x).removeClass('able').siblings().addClass('able');
				$show.stop().animate({
					marginLeft : -x*1226 + 'px'
				},500);
			},6000);
		};
	})();

/* macth */
	(function(){
		var $tab = $('#match .m_title ul li');
		var $ul = $('#match .m_c_right ul');
		var $li = $ul.children('li');
		$ul.eq(0).show().siblings().hide();
		$tab.eq(0).addClass('hover');
		$tab.mouseenter(function(){
			$(this).addClass('hover').siblings().removeClass('hover');
			$ul.eq($(this).index()).show().siblings().hide();
		});
		$li.hover(function(){
			$(this).find('.comments').stop().animate({bottom : 0},200);
		},function(){
			$(this).find('.comments').stop().animate({bottom : '-75px'},200);
		});
	})();

/* neirong */
	(function(){
		var $li1 = $('#neirong li.li1');
		var $link = $('#neirong li.li1 .link a');
		var li1Width = $li1.width();
		var clickTime = 0;
		$li1.hover(function(){
			$(this).find('.btn div').stop().fadeIn(200);
		},function(){
			$(this).find('.btn div').stop().fadeOut(200);
		}).each(function(){
			var index = 0;
			var $tabLi = $(this).find('.tab .tabLi');
			var $btnDiv = $(this).find('.btn div');
			$tabLi.eq(0).addClass('on');
			$tabLi.click(function(){
				$(this).addClass('on').siblings().removeClass('on');
				index = $(this).index();
				$(this).parents('li.li1').find('ul.ul2').stop().animate({marginLeft:-index*li1Width+'px'},300);
			});
			$btnDiv.click(function(){
				if ( new Date() - clickTime >= 300 )
				{
					clickTime = new Date();
					$(this).index()?index++:index--;
					index = Math.max(index,0);
					index = Math.min(index,$tabLi.length-1);
					$tabLi.eq(index).addClass('on').siblings().removeClass('on');
					$(this).parents('li.li1').find('ul.ul2').stop().animate({marginLeft:-index*li1Width+'px'},300);
				}
			}).each(function(){
				this.onselectstart = function(){return false};
			});
		});
		$link.each(function(){
			var color = $(this).parents('li.li1').css('border-top-color');
			$(this).css({
				border : '1px solid '+color,
				color : color
			}).hover(function(){
				$(this).css({
					background:color,
					color:'#fff'
				});	
			},function(){
				$(this).css({
					border : '1px solid '+color,
					color : color,
					background:'#fff',
				});	
			});
		});
	})();

/* video */
	(function(){
		var $play = $('#video .v_content ul li a.img');
		var $cover = $('#video .v_cover');
		$play.click(function(){
			$cover.show();
			$cover.append('<div class="main">'+
				'<div class="m_title"></span>'+ $(this).siblings('.title').html() +'</span><span class="close"> ¡Á </span></div>'+
				'<div class="play">'+
					'<embed src="http://player.video.qiyi.com/67089aea6e02f74444e51af14f7aca7f/0/0/w_19rqpqie4d.swf-albumId=1803006609-tvId=1803006609-isPurchase=0-cnId=21" allowFullScreen="true" quality="high" width="800" height="540" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'+
				'</div>'+
			'</div>');
			$cover.find('.main').css({'marginTop':'-600px','opacity':'0'}).stop().animate({
				opacity : 1,
				marginTop : '-300px'
			});
		});
		$cover.on('click' , 'span.close' , function(){
			$(this).parent().parent().animate({
				marginTop : '-600px'
			},300,function(){
				$cover.find('.main').remove();
				$cover.hide();
			});
		});

	})();


