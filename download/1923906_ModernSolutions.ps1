function KillThatProcess([string]$processName){

    $processes = $null
    $processes = Get-Process $processName -ErrorAction Ignore

    if($processes -eq $null){
        Write-host "Error! No processes with the name $($processName) are open!" -BackgroundColor Red -ForegroundColor Black
    }else{
        $answer = Read-Host -Prompt "There are $($processes.length) processe(s) with the name $($processName), proceed? Y/N"

        if($answer -ne "y"){ #No need for .ToLower(), because Powershell
            Write-Host "You cancelled the operation." -BackgroundColor Red -ForegroundColor Black
        }else{
            $processes | kill
            Write-Host "Succesfully killed all the processes." -BackgroundColor Green -ForegroundColor Black
        }
    }
}


function Bamboozle{
    Param(
        [string]$location = $PSScriptRoot + "\"
    )

    [char] $letter = Get-Random -Minimum 65 -Maximum 91

    Write-Host $letter

    Get-ChildItem -Path $location -Filter *$letter* -File | Remove-Item -WhatIf
}