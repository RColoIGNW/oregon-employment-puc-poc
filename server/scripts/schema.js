const tsj = require("ts-to-json")
const fs = require("fs")

const config = {
    path: "../src/interfaces/application.interface.ts", // TODO: pass args to generate your schema during development then move to build script
    tsconfig: __dirname + "/tsconfig.json",
    type: "ApplicationSchema", // Or <type-name> if you want to generate schema for that one type only
    expose: "export",
    jsDoc: "extended",
    topRef: true
}

const output_path = __dirname + "/../src/interfaces/application-schema.json"

const schema = tsj.createGenerator(config).createSchema(config.type)
const schemaString = JSON.stringify(schema, null, 2)
fs.writeFile(output_path, schemaString, (err) => {
    if (err) throw err
})
