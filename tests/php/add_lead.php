<?php
$conf = require('./_config.php');

$action = 'crm.lead.add';

$URL = sprintf('https://%s/rest/%d/%s/%s.%s', 
    $conf['domain'], $conf['user_id'], $conf['webhook'], $action, $conf['format']);


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

$lead_data = [
    'fields' => [
        'ASSIGNED_BY_ID' => $conf['user_id'],
        'STATUS_ID' => 'NEW',
        'OPENED' => 'Y',

        'TITLE' => 'Lilu Dallas', // REQUIRED
        'NAME' => 'Lilu',
        'LAST_NAME' => 'Dallas',
        "PHONE" => [[ 'VALUE' => '9721234567', 'VALUE_TYPE' => 'WORK' ]],
        'EMAIL' => [[ 'VALUE' => 'lilu@gmail.com', 'VALUE_TYPE' => 'WORK' ]],
        'COMPANY_TITLE' => 'Intergalactic balance',
        'SOURCE_DESCRIPTION' => 'Venus Planet',
        'CURRENCY_ID' => 'USD',
        'OPPORTUNITY' => 15000,
    ],
    'params' => [
        'REGISTER_SONET_EVENT' => 'Y'
    ]
];

function writeToLog($data, $title = '') {
    $log = "\n------------------------\n";
    $log .= date("Y.m.d G:i:s") . "\n";
    $log .= (strlen($title) > 0 ? $title : 'DEBUG') . "\n";
    $log .= print_r($data, 1);
    $log .= "\n------------------------\n";
    file_put_contents(getcwd() . '/hook.log', $log, FILE_APPEND);
    return true;
}


$query_data = http_build_query($lead_data);
$curl_options = [
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $URL,
    CURLOPT_POSTFIELDS => $query_data,
];

$curl = curl_init();
curl_setopt_array($curl, $curl_options);

$result = curl_exec($curl);
curl_close($curl);

$result = json_decode($result, 1);
writeToLog($result, 'webform result');

if (array_key_exists('error', $result))
    echo "Error saving Lead: ".$result['error_description']."\n";
