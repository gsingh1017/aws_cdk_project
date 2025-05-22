import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as rds from "aws-cdk-lib/aws-rds"

interface RDSStackProps extends cdk.StackProps {
    vpc: ec2.Vpc; 
}


export class RDSStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: RDSStackProps){
        super(scope, id, props);

    // Custom Parameter Group
    const databaseParameterGroup = new rds.ParameterGroup(this, "MyParameterGroup", {
        engine: rds.DatabaseInstanceEngine.postgres({
            version: rds.PostgresEngineVersion.VER_17_2,
        }),

    description: "My custom parameter group",
    // Example Parameters
    parameters: {
        "application_name": "TestDBParameter", // default empty
        "autovacuum_naptime": "30", // default 15
        "cron.max_running_jobs": "2", // default 5 
    },
    })

    
    const database = new rds.DatabaseInstance(this, "MyPrivateDatabase", {
        vpc: props.vpc,
        vpcSubnets: {
            subnetGroupName: "Database",
            onePerAz: true,
        },
        // SQL Example
        // engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0 }),

        // PostgreSQL Example
        engine: rds.DatabaseInstanceEngine.postgres({ 
            version: rds.PostgresEngineVersion.VER_17
        }),
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
        databaseName: "MyDatabase",
        allocatedStorage: 20,
        maxAllocatedStorage: 30,
        
        // Backup Configutaion
        deletionProtection: false,
        removalPolicy: cdk.RemovalPolicy.DESTROY,

        // Custom Parameter Group
        parameterGroup: databaseParameterGroup,
    })  

        cdk.Tags.of(database).add("Name", "MyPrivateDatabase") 
}
}