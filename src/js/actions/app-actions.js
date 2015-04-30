var AppConstants = require('../constants/app-action-name');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
    fetchIssues: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.FetchIssues
        });
    },
    search: function (q) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.Search,
            query:q
        });
    },
    addIssue: function(issueId){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.AddIssue,
            issueId:issueId
        });
    },
    updateTime: function(issueId, activityId, spentHours){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UpdateTime,
            timeEntry: {
                issue_id: issueId,
                spent_on : new Date(),
                activity_id: activityId,
                hours: spentHours,
                comments: "test comment"
            }
        });
    },
    createTimeEntries: function(){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CreateTimeEntries
        });
    },
    saveSettings: function(url, apiKey){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SaveSettings,
            settings: {
                url : url,
                apiKey: apiKey
            }
        });
    }
}

module.exports = AppActions;
