-- local
local internet = require ("internet")
local term = require ("term")

-- me utilities
local component = require ("component")
local me = component.me_interface

-- vars
-- http://31.207.126.172:8080 base
local baseUrl = "<BASEURL>"
local delay = 200

local itemsInterface = baseUrl .. "/v1/data/items"
local fluidInterface = baseUrl .. "/v1/data/fluids"
local energyInterface = baseUrl .. "/v1/data/energy"

print("--- MESYS ---")
print("")
print("Reporing to " .. baseUrl)
print("Delay set to " .. delay .. " seconds")
print("")
print("[items] " .. itemsInterface)
print("[fluid] " .. fluidInterface)
print("[energy] " .. energyInterface)
print("")
print("")
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

function send(data, url)
    handle = internet.request(url, tableToString(data))
    result = ""
    for chunk in handle do result = result..chunk end
end

function sendString(data, url)
    handle = internet.request(url, data)
    result = ""
    for chunk in handle do result = result..chunk end
end

function reportItems()
    items = me.getItemsInNetwork()
    send(items, itemsInterface);
    os.sleep(delay)
end

function reportFluids()
    fluids = me.getFluidsInNetwork()
    send(fluids, fluidInterface);
    os.sleep(delay)
end

function reportEnergy()
    powerInjection = "powerInjection=" .. me.getAvgPowerInjection();
    powerUsage = "powerUsage=" .. me.getAvgPowerUsage();
    idlePowerUsage = "idlePowerUsage=" .. me.getIdlePowerUsage();
    maxStoredPower = "maxStoredPower=" .. me.getMaxStoredPower();
    storedPower = "storedPower=" .. me.getStoredPower();
    result = powerInjection .. "," .. powerUsage .. "," .. idlePowerUsage .. "," .. maxStoredPower .. "," .. storedPower
    sendString(result, energyInterface);
    os.sleep(delay)
end


while(true) do
    reportItems();
    reportFluids();
    reportEnergy();
end