-- internet
local internet = require ("internet")

-- me utilities
local component = require ("component")
local me = component.me_interface
local sr = require("serialization")

-- server
local url = "http://31.207.126.172:8080/data"

print("Reporing to " .. url)

function dump(o)
    if type(o) == 'table' then
       local s = ''
       for k,v in pairs(o) do
          if type(k) ~= 'number' then k = k end
          s = s .. k .. '=' .. dump(v) .. ','
       end
       return s:sub(1, -2) -- remove the trailing comma
    else
       if type(o) == 'string' then
           return o 
       else
           return tostring(o)
       end
    end
end


function send(id, data)
    handle = internet.request(url, dump(data))
    result = ""
    for chunk in handle do result = result..chunk end

    print("Uploaded Item " ..id .. ": " .. result)
end


while(true) do
    items = me.getItemsInNetwork()
    for id, item in pairs(items) do
        send(id, item)
    end
    os.sleep(1)
end