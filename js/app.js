(function (angular) {
	'use strict';

	// 创建一个模块
	var myApp = angular.module('MyTodoMvc',[]);
	
	//注册一个主要的控制器
	
	myApp.controller('MainController',['$scope',function($scope){
		
		//文本框需要一个值
		$scope.text = '';
		
		//任务列表需要一个数据模型
		$scope.todos = [
		  //每个人物列表数据模型
		  { id: 1, text: '学习', completed: true },
		  { id: 2, text: '吃饭', completed: true },
		  { id: 3, text: '睡觉', completed: true },
		];
		
		//添加doto事件
		$scope.add = function(){
			//新添加todo
			if($scope.text){
				$scope.todos.push({
					//此处id存在重复的可能性，默认不再做处理了
					id: Math.random(),
					text: $scope.text,
					completed: false
				});
				//清空模型文本框数据
				$scope.text = '';
			}
		}
		
		//删除todo
		$scope.remove = function(id){
			//遍历查找要删除的todo
			for(var i = 0 ; i < $scope.todos.length ; i++){
				if($scope.todos[i].id === id){
					//删除此todo
					$scope.todos.splice(i,1)
					break;
				}
			}
		}
		
		//清空已经完成todo
		$scope.clear = function(){
			$scope.todos = $scope.todos.filter(function(todo){
				return !todo.completed
			})
		}
		
		//是否有已经完成的
		$scope.existCompleted = function(){
			for(var i = 0 ; i < $scope.todos.length ; i++){
				if($scope.todos[i].completed){
					//存在已经完成事项时
					return true;
				}
			}
			return false;
		}
		
		//实现编辑,主要记录编辑ID
        //记录正在编辑的id
		$scope.currentEdiitingId = null;
		//修改编辑ID
		$scope.changeCurrentId = function(id){
			$scope.currentEdiitingId = id
		};
		//修改结束
		$scope.save = function(id){
			$scope.currentEdiitingId = null
		};
		
		//实现全选
		//记录全选状态 
		var checkRecord;
		//初始时的全选状态
		$scope.checkall = function(){
			if(!$scope.todos.length){
				return false;
			}
			for(var i = 0 ; i < $scope.todos.length ; i++){
				if(!$scope.todos[i].completed){
					//存在未完成事项时
					checkRecord = false;
					return false;
				}
			}
			checkRecord = true;
			return true;
		};
        //全选或取消全选
        $scope.changeCheckall = function(){
        	//console.log(checkRecord)
        	for (var i = 0 ; i < $scope.todos.length ; i++) {
        		$scope.todos[i].completed = !checkRecord
        	}
        }
        
	}]);

})(angular);
