/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var NONE = "None";
var ORDER_ASEC = "Ascending Order";
var ORDER_DESC = "Descending Order";
var orderingFields = ["orderAttribute"];

hideElements(orderingFields);

$('select').on('change', function () {
    if ($(this).attr("name") === "dataOrder") {
        var orderType = $(this).find(":selected").val();
        switch (orderType) {
            case NONE:
                hideElements(orderingFields);
                break;
            case ORDER_ASEC:
                getDataTableColumns();
                showElements(orderingFields);
                break;
            case ORDER_DESC:
                getDataTableColumns();
                showElements(orderingFields);
                break;
        }
    }
    if ($(this).attr("name") === "tableName") {
        $("select").each(function () {
            if ($(this).attr("name") === "orderAttribute") {
                $(this).html('');
                hideElements(orderingFields);
                $("select").each(function () {
                    if ($(this).attr("name") === "dataOrder") {
                        $(this)[0].selectedIndex = 0;
                    }
                });
            }
        });
    }
});

function hideElements(elementsNames) {
    $('#provider-config-form :input').each(function (index, data) {
        if (elementsNames.includes($(this).attr("name"))) {
            $(this).closest('div').fadeOut();
        }
    });
}

function showElements(elementsNames) {
    $('#provider-config-form :input').each(function (index, data) {
        if (elementsNames.includes($(this).attr("name"))) {
            $(this).closest('div').fadeIn();
        }
    });
}

function getDataTableColumns() {
    $("select").each(function () {
        if ($(this).attr("name") === "tableName") {
            var tableName = $(this).find(":selected").val();
            var data = {};
            data.tableName = tableName;
            $.ajax({
                url: '/portal/extensions/providers/motorRally/motorRallyClientInvoker.jag',
                method: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                async: true,
                success: function (data) {
                    $("select").each(function () {
                        if ($(this).attr("name") === "orderAttribute") {
                            $(this).html('');
                            var element = $(this);
                            $.each(data.columns, function (column) {
                                element.append($("<option></option>").attr("value",column).text(column));
                            });
                        }
                    });
                }
            });
        }
    });
}



