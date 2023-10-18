<!-- Material Icon Theme Notes -->

# Material Icon Theme Notes

### [ ] 1. [Introduction](#introduction)Generative AI is experimental. Info quality may vary.

-   To add a custom folder icon in Material Icon Theme, you can:
-   Go to the Settings.json file.
-   Select material customer folders.
-   Select material folder icons.
-   Select material file icons.
-   You can also set the icons of the folders in the settings of the extension. By - default, it's set on "specific".
-   To install the Material Icon Theme, you can:
-   Click on the Extension icon.
-   Search for the Material Icon Theme and click on the top suggested extension.
-   Click on the Install.
-   You can activate the theme by:
-   Linux Ctrl + Shift + P.
-   macOS ⌘ + Shift + P.
-   Windows Ctrl + Shift + P.

##### CODE AREA

-   To add a custom folder icon in Material Icon Theme, you can:

### Generative AI is experimental. Info quality may vary.

# To add a custom folder icon to a Material Icon Theme:

-   you can go to the Settings.json file and add the following:

-   material customer folders
-   material folder icons
-   material file icons
-   You can also change the theme of an icon in Visual Studio - Code by:
-   Opening the File Icon Theme picker
-   Using the cursor keys to preview the icons of the theme
-   Selecting the theme you want and hitting Enter
-   You can also change a folder icon in Windows by:
-   Right-clicking the folder
-   Selecting Properties
-   Switching to the Customize tab
-   Selecting the Change Icon button
-   Clicking Browse
-   Selecting the location of the icon
-   Clicking Open, OK, Apply, and OK again

```bash





```

To add custom folder icons in Material-Icon Themes, you can add the icon to the src/resources/icons/files folder. The icon must meet the following requirements:

File Icons - Material Theme UI Documentation
Customization _ The icon must be an acknowledged icon, which means from one of the aforementioned resources. ... _ The icon must be in SVG format and its width and height must be 16×16 . _ The icon must not weigh too much (it rarely exceeds 5 KB) _ Add the icon in the src/resources/icons/files folder.

Material Theme
Be in SVG format
Have a width and height of 16×16
Weigh less than 5 KB
The custom icons must be located in the extensions directory of the .vscode folder in the user directory. The custom file name must be configured in the settings without the file ending .svg.

https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme#:~:text=Custom%20SVG%20icons&text=However%2C%20the%20restriction%20applies%20that,folder%20in%20the%20user%20directory.&text=Note:%20The%20custom%20file%20name,shown%20in%20the%20example%20above.

To add a custom folder icon, you can:

https://gist.github.com/rupeshtiwari/6860fbc1b3e2f6711c780070d6f59748#:~:text=Steps%20to%20add%20custom%20folder%20icon%20in,material%20folder%20icons%20%C2%B7%20material%20file%20icons.

Go to the Settings.json file
Go to material customer folders
Go to material folder icons
Go to material file icons
