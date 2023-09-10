local component = require("component")
local filesystem = require("filesystem")
local internet = require("internet")
local computer = require("computer")
local io = require("io")

-- 1. Prompt the user for IP Address
io.write("Enter IP address: ")
local ip = io.read()

-- Create URL
local url = "http://"..ip..":8080/v1/setup/code"

-- 2. Fetch the script from the server
print("Fetching script from server...")
local response = internet.request(url)

-- Check if we were able to create a request
if not response then
    print("Failed to connect to the server.")
    return
end

-- Read the content
local content = ""
for chunk in response do
    content = content .. chunk
end

-- Directory and file path
local dirPath = "/home/mesys"
local filePath = dirPath.."/server.lua"

-- 3. Save the script
filesystem.makeDirectory(dirPath)   

local file = io.open(filePath, "w")
file:write(content)
file:close()

print("Script saved to " .. filePath)

-- 4. Set as startup script
local startupPath = "/home/.shrc"
file = io.open(startupPath, "a")  -- Open in append mode
file:write(filePath)
file:close()

print("Script registered as startup script.")
computer.shutdown(true)