#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from 'aws-cdk-lib';
import { ProjectStack } from '../lib/project-stack';
import { EC2Stack } from '../lib/ec2-stack';
import { RDSStack } from "../lib/rds-stack";

const app = new cdk.App();
const vpcStack = new ProjectStack(app, 'ProjectStack', {
  
});

new EC2Stack(app, "MyEC2Stack", {
  vpc: vpcStack.vpc,
});

new RDSStack(app, "MyRDSStack", {
  vpc: vpcStack.vpc,
});

app.synth();