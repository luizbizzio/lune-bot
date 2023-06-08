REM http://www.msfn.org/board/topic/119612-how-to-install-a-font-via-the-command-line/

@ECHO OFF
TITLE Adding Fonts..
REM Filename: ADD_Fonts.cmd
REM Script to ADD TrueType and OpenType Fonts for Windows
REM By Islam Adel
REM 2012-01-16

REM How to use:
REM Place the batch file inside the folder of the font files OR:
REM Optional Add source folder as parameter with ending backslash and dont use quotes, spaces are allowed
REM example "ADD_fonts.cmd" C:\Folder 1\Folder 2\

IF NOT "%*"=="" SET SRC=%*
ECHO.
ECHO Adding Fonts..
ECHO.
FOR /F %%i in ('dir /b "%SRC%*.*tf"') DO CALL :FONT %%i
REM OPTIONAL REBOOT
REM shutdown -r -f -t 10 -c "Reboot required for Fonts installation"
ECHO.
ECHO Done!
exit

:FONT
ECHO.
REM ECHO FILE=%~f1
SET FFILE=%~n1%~x1
SET FNAME=%~n1
SET FNAME=%FNAME:-= %
IF "%~x1"==".otf" SET FTYPE=(OpenType)
IF "%~x1"==".ttf" SET FTYPE=(TrueType)

ECHO FILE=%FFILE%
ECHO NAME=%FNAME%
ECHO TYPE=%FTYPE%

COPY /Y "%SRC%%~n1%~x1" "%SystemRoot%\Fonts\"
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts" /v "%FNAME% %FTYPE%" /t REG_SZ /d "%FFILE%" /f
GOTO :EOF