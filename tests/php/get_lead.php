<?php
$conf = require('./_config.php');

$action = 'crm.lead.get';
$lead_id = 13;

$URL = sprintf('https://%s/rest/%d/%s/%s.%s?id=%d', 
    $conf['domain'], $conf['user_id'], $conf['webhook'], $action, $conf['format'], $lead_id);


function writeToLog($data, $title = '') {
    $log = "\n------------------------\n";
    $log .= date("Y.m.d G:i:s") . "\n";
    $log .= (strlen($title) > 0 ? $title : 'DEBUG') . "\n";
    $log .= print_r($data, 1);
    $log .= "\n------------------------\n";
    file_put_contents(getcwd() . '/hook.log', $log, FILE_APPEND);
    print $log;
    return true;
}


$curl_options = [
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 0,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $URL,
];

$curl = curl_init();
curl_setopt_array($curl, $curl_options);

$result = curl_exec($curl);
curl_close($curl);

$result = json_decode($result, 1);
writeToLog($result, 'webform result');

if (array_key_exists('error', $result))
    echo "Error saving Lead: ".$result['error_description']."\n";
