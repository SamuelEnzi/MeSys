-- local
local internet = require ("internet")
local term = require ("term")

-- me utilities
local component = require ("component")
local me = component.me_interface

-- vars
local url = "http://31.207.126.172:8080/data"
local delay = 600

print("--- MESYS ---")
print("")
print("Reporing to " .. url)
print("Delay set to " .. delay .. " seconds")
print("Press Ctrl+Alt+C to stop")

local function tableToString(t)
    local outerList = {}
    for _, item in pairs(t) do
        local innerList = {}
        for k, v in pairs(item) do
            table.insert(innerList, tostring(k) .. "=" .. tostring(v))
        end
        table.insert(outerList, table.concat(innerList, ","))
    end
    return table.concat(outerList, ";")
end

function send(data)
    handle = internet.request(url, tableToString(data))
    result = ""
    for chunk in handle do result = result..chunk end
end

while(true) do
    items = me.getItemsInNetwork()
    send(items);
    os.sleep(delay)
end