@ECHO OFF
TITLE Adding Fonts..
IF NOT "%*"=="" SET SRC=%*
ECHO.
ECHO Adding Fonts..
ECHO.
FOR /F %%i in ('dir /b "%SRC%*.*tf"') DO CALL :FONT %%i
ECHO.
ECHO Done!
exit

:FONT
ECHO.
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