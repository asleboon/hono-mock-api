import * as resources from "@pulumi/azure-native/resources";
import * as web from "@pulumi/azure-native/web";
import * as pulumi from "@pulumi/pulumi";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("can-i-haz-weather-dev", {
  location: "West Europe",
});

const plan = new web.AppServicePlan("free-plan", {
  resourceGroupName: resourceGroup.name,
  location: resourceGroup.location,
  kind: "Linux",
  reserved: true, // Creates Windows machine if not set.
  sku: {
    name: "F1",
    tier: "Free",
  },
});

const imageInDockerHub = "asleboon/can-i-haz-weather:latest";

const app = new web.WebApp("can-i-haz-weather", {
  resourceGroupName: resourceGroup.name,
  location: resourceGroup.location,
  serverFarmId: plan.id,
  siteConfig: {
    appSettings: [
      {
        name: "WEBSITES_ENABLE_APP_SERVICE_STORAGE",
        value: "false",
      },
      {
        name: "WEBSITES_PORT",
        value: "8080",
      },
    ],
    alwaysOn: false,
    linuxFxVersion: `DOCKER|${imageInDockerHub}`,
  },
  httpsOnly: true,
});

export const appUrl = pulumi.interpolate`https://${app.defaultHostName}`;
