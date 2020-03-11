function KillThatProcess([string]$processName){

    $processes = $null
    $processes = Get-Process $processName -ErrorAction Ignore

    if($processes -eq $null){
        Write-host "Error! No processes with the name $($processName) are open!"
    }else{
        Write-Host "There are $($processes.length) processe(s) with the name $($processName), proceed? Y/N"
        $answer = Read-Host

        if($answer.ToLower() -ne "y"){
            Write-Host "You cancelled the operation." -BackgroundColor Red -ForegroundColor Black
        }else{
            $processes | kill
        }
    }
}


function Bamboozle{
    Param(
        [string]$location = "./"
    )

    Write-Host [char]90
}

KillThatProcess('notepad')