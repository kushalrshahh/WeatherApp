
FORECAST FOR {{ city }}
<html>
<head>
</head>

<p>
	<a href="#!/"> Back to Search </a>
</p>
<hr />
Days <a href="#!/forecast/2" ng-class= "{'bg-primary' : days === '2'}">2</a> | <a href="#!/forecast/5" ng-class= "{'bg-primary' : days === '5'}">5</a> | <a href="#!/forecast/7" ng-class= "{'bg-primary' : days === '7'}">7</a>
<div ng-repeat="w in weatherResult.list" ng-controller='forecastController'>
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title">{{ convertToDate(w.dt) | date: 'MMM d,y' }}</h3>
				</div>
				<div class="panel-body">
				<div class="form-group">
				<div class="radio">
				<label>
				<input type="radio" name="df" value="degree" ng-model="formdata.tempabc"> Degree </label>
				</div>
        <div class="radio">
            <label>
                <input type="radio" name="df" value="egg" ng-model="formData.tempabc">
                Egg
            </label>
        </div>
    </div>


				</div>
			</div>
		</div>
	</div>
</div>

