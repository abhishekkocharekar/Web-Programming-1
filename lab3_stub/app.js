const people = require("./people");
const company = require("./companies");

async function main(){

    try{
        console.log(await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440"));
        console.log (await people.getPersonById(-1));
    }catch(e){
        console.log ("Error:",e);
    }

    try{
        console.log (await people.sameJobTitle("Help DESK Operator"));
        console.log (await people.sameJobTitle(true));
    }catch(e){
        console.log ("Error:",e);
    }

    try{
        console.log (await people.getPostalCodes("Roanoke", "Virginia"));
        console.log (await people.getPostalCodes("Bayside", "New York"));
    }catch(e){
        console.log ("Error:",e);
    }

    try{
        console.log (await people.sameCityAndState("Salt Lake City", "Utah"));
        console.log (await people.sameCityAndState("Bayside", "New York"));
    }catch(e){
        console.log ("Error:",e);
    }

    try{
        console.log (await company.listEmployees("Breitenberg-Quitzon"));
        console.log (await company.listEmployees(123));
    }catch(e){
        console.log ("Error:",e);
    }

    try{
        console.log (await company.sameIndustry("Auto Parts:O.E.M."));
        console.log (await company.sameIndustry("foobar"));
    }catch(e){
        console.log ("Error:",e);
    }

    try{
        console.log (await company.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf"));
        console.log (await company.getCompanyById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
    }catch(e){
        console.log ("Error:",e);
    }
    
}

main();

