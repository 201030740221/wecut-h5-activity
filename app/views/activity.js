import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';

var ActivityPage = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	/*请求数据*/
	getActivityData(){

		let self = this;

		$.ajax({
	        dataType: 'json',
	        url: 'http://hd.wecut.com/api/starlive/rank.php',
	        success: function(data){

	        		self.setState({
	        			loading: false,
	        			time: data.data.seconds,
	        			source: data
	        		})
	                //处理data数据
        		}
		});
	},
    getInitialState: function () {
        return {
        	source: {},
        	time: null,
        	loading: true
        };
    },
    componentDidMount: function () {
       this.getActivityData();
    },
    viewHandle(tid){
    	doGoTule(tid);
    },

    countHandle(_time){
    	console.log(_time);
    	let	ts = new Date(_time),
			newYear = true;
		
		if((new Date()) > ts){
			// The new year is here! Count towards something else.
			// Notice the *1000 at the end - time must be in milliseconds
			ts = (new Date()).getTime() + 10*24*60*60*1000/2;
			newYear = false;
		}
		console.log(ts,'ts');
			
		$('#countdown').countdown({
			timestamp	: ts,
			callback	: function(days, hours, minutes, seconds){
				
				var message = "";
				
				message += days + " day" + ( days==1 ? '':'s' ) + ", ";
				message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
				message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
				message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
				
				if(newYear){
					message += "left until the new year!";
				}
				else {
					message += "left to 10 days from now!";
				}
				
			}
		});
    },
    componentDidUpdate(){

    	this.countHandle(this.state.time);
    },

    render: function () {

    	let self = this;
    	if(this.state.loading){
    		return (
    				<p>正在加载中，请稍等片刻哦...</p>
    			)
    	}
    	let source = this.state.source;
    	let star = source.data.star || [];
    	console.log(source);
        return (
            <div className="whole activity_page">
		        <div className="p_r">
		            <img className="activity_banner" src="images/logo.png" alt=""/>
		            <div className="time_data"><span className='time_title'>离截至时间：</span><span id="countdown"></span></div>
		        </div>
		        <div className="activity_content">
		            <p className="activity_dec">
		                如果你开直播，最想哪位欧巴来围观送花
		            </p>
		            <p className="activity_dec">
		                - 选中心仪的欧巴，点击【黄色开拍按钮】
		            </p>
		            <p className="activity_dec">
		                - 再点击左下角的【翻拍】
		            </p>
		        </div>
		        <div className="activity_content">
		        {
		        	star.map(function(item,key){
	        			return (
	        				<div className='list' key={key}>
				            	<div className="list_left">
				            		<img className="list_img" src={item.image} alt="" />
				            		<div className="list_dec">
				            			<p className="large_title">{item.name}</p>
				            			<p>围观：{item.copynum}</p>
				            		</div>
				            		<div className="view_icon" onClick={self.viewHandle.bind(null,item.tid)}></div>
				            	</div>
				            	<div className="list_right fr hidden">
				            		<div className="share_icon "></div>
				            	</div>
				            </div>
	        			)
		        	})
		        }
		        </div>
		    </div>
        );
    }
});

module.exports = ActivityPage;