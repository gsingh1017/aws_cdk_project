#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ProjectStack } from '../lib/project-stack';

const app = new cdk.App();
const vpcStack = new ProjectStack(app, 'ProjectStack', {
  
});


app.synth();