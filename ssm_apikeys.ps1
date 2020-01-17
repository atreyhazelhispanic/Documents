 param (
    [string]
    [Parameter(Mandatory = $true, Position=0)]
    $ssmParamName,
    [string]$webConfig = "c:\inetpub\wwwroot\QueryAPI\Web.config"
) 

$ssmParamValue = (Get-SSMParameterValue -Name $ssmParamName –WithDecryption $true).Parameters.Value;
.
.
.


if (Test-Path $webConfig){
    $doc = (Get-Content $webConfig) -as [Xml]
    $root = $doc.get_DocumentElement();

    $newElement = $doc.CreateElement("apiKey");
    $valueAttr = $doc.CreateAttribute("value");
    $valueAttr.psbase.value = $ssmParamValue;
    $newElement.SetAttributeNode($valueAttr);
    $ownerAttr = $doc.CreateAttribute("owner");
    $ownerAttr.psbase.value = "owner_testing";
    $newElement.SetAttributeNode($ownerAttr);
    $doc.configuration["apiAuthorization"]["apiAuthorizationProfiles"]["profile"]["apiKeys"].AppendChild($newElement);
    .
    .
    .
    
    $doc.Save($webConfig);

    foreach ($item in $root.apiAuthorization.apiAuthorizationProfiles.profile.apiKeys.apiKey){
        Write-Host $item;
    }
}

# Then they can be set in the web.config, located on the instance at "C:\inetpub\wwwroot\QueryAPI\Web.config" 
# which is where the application is using them from now. An example of this sort of implementation can be seen here and here.
# https://jonlabelle.com/snippets/view/powershell/set-webconfig-appsettings-with-powershell
# https://anthonychu.ca/post/overriding-web-config-settings-environment-variables-containerized-aspnet-apps/

# 
