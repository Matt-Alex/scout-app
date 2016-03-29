
/*
The handles creating new projects, saving them, and loading them.
*/

(function(){

    //This will change all UI elements for Project Settings back to an empty/default state
    function resetProjectSettingsUI () {
        $("#projectIcon").attr('src', '_img/logo_128.png');
        $("#projectName").html('');
        $("#projectFolder").val('');
        $("#inputFolder").val('');
        $("#inputFolderBrowse").attr('nwworkingdir','...');
        $("#inputFolderBrowse").val('');
        $("#outputFolder").val('');
        $("#outputFolderBrowse").attr('nwworkingdir','...');
        $("#outputFolderBrowse").val('');
        $("#outputWarning").addClass('hide');
        $('#environment input[data-argname="development"]').click();
        $($("#outputStyle option")[0]).prop("selected", true);
        $("#printConsole .alert, #printConsole .panel").addClass('hide');

        var newProject = {
            "projectID":     "",
            "projectFolder": "",
            "projectName":   "",
            "imageFolder":   "",
            "projectIcon":   "",
            "inputFolder":   "",
            "outputFolder":  "",
            "environment":   "production",
            "outputStyle":   "compressed",
            "indicator":     "play"
        };
        scout.newProject = newProject;
    }

    /**
     * Pass in the project ID starting with 'sa' to remove it
     * from the scout.projects array.
     *
     * @param  {string}   projectID
     *
     * scout.helpers.removeProject('sa0000000000000');
     */
    function removeProject (projectID) {
        if (!projectID || typeof(projectID) !== "string") {
            console.log("Can't remove project, pass in a valid project ID to remove");
            return;
        }

        for (var i = 0; i < scout.projects.length; i++) {
            var currentItem = scout.projects[i].projectID;
            if (projectID == currentItem) {
                var projectToRemove = scout.projects[i];
                scout.projects.remove(projectToRemove);
            }
        }
        scout.helpers.updateSidebar();
        scout.helpers.saveSettings();
    }

    /**
     * Pass in a object containing all the settings for a project:
     *
     * var project = {
     *        "projectID":     "sa0000000000000",
     *        "projectName":   "my-project",
     *        "projectFolder": "~/GitHub/my-project",
     *        "inputFolder":   "~/GitHub/my-project/_sass",
     *        "outputFolder":  "~/GitHub/my-project/_style",
     *        "projectIcon":   "~/GitHub/my-project/_img/meta/logo.png",
     *        "environment":   "production",
     *        "outputStyle":   "compressed"
     *    }
     *
     * @param {object}   project
     */
    function addProject (project) {
        if (!project || typeof(project) !== "object") {
            console.log("Can't add project, you need to pass in a valid project.")
            return;
        }
        if (!project.projectID ||
            !project.projectName ||
            !project.projectFolder
        ) {
            console.log("Can't add project, you are missing stuff.");
            console.log(project);
            return;
        }

        //Add to the end of the projects list
        scout.projects.push(project);

        scout.helpers.updateSidebar();
        saveSettings();
    }

    function saveSettings () {
        var appData = require('nw.gui').App.dataPath;
        appData.split('\\').join('/');
        var settingsJSON = appData + "/scout-settings.json"

        ugui.helpers.writeToFile(settingsJSON, JSON.stringify(scout));
    }


    scout.helpers.resetProjectUI = resetProjectSettingsUI;

    //scout.helpers.removeProject('sa1459092789554');
    scout.helpers.removeProject = removeProject;

    //scout.helpers.addProject( {projectID:'',projectName:'',projectFolder:'',inputFolder:'',outputFolder:'',projectIcon:'',environment:'',outputStyle:''} );
    scout.helpers.addProject = addProject;

    //Save scout object to file in app data folder
    scout.helpers.saveSettings = saveSettings;

})();
