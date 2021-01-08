import json, os, sys, shutil, time, threading, subprocess, datetime, random, string
from base64 import b64encode
from dateutil.tz import tzutc

# Add project location in python sys paths.
projectPath = os.getcwd().split("aws-spot")[0]
sys.path.insert(0, (projectPath + "aws-spot"))
projectPath = os.path.join(projectPath, "aws-spot")
#from LogHandler import SetUpLogger

class AWSSpotCreation:

    def __init__(self):

        # Create a logger.
        #self.logger = SetUpLogger("AWS Spot Creation", LOGFILE)

        with open(JSON_SPOT_CONFIG_FILE) as f:
            self.config_spot = json.load(f)
        self.list_of_instances=[]
        self.list_of_instances.append(self.config_spot['Instance_Name']+'Primary')
        for instance in range(int(self.config_spot["Number_of_Secondary_VMs"])):
                self.list_of_instances.append(self.config_spot['Instance_Name']+'-Secondary'+str(instance+1))
        for instance in range(int(self.config_spot["Number_of_Tertiary_VMs"])):
                self.list_of_instances.append(self.config_spot['Instance_Name']+'-Tertiary'+str(instance+1))
        
        #for deletion
        self.volumeIds = []

    def create_spot_instances(self,Number_of_Instances,Model,type_of_deployment):
        
        instanceType = os.environ['instanceType']
		data=os.environ['metadata']
		
        Duration=int(self.config_spot['Duration'])*60
        client = boto3.client('ec2')
        response = client.request_spot_instances(

            BlockDurationMinutes=Duration,
            InstanceCount=int(Number_of_Instances),
            LaunchSpecification={
                'ImageId': self.amiID,
                'InstanceType': instanceType,
                'KeyName': os.environ['keypair_path'],
                'BlockDeviceMappings': [
                    {
                "DeviceName": "/dev/xvda",
                "Ebs": {
                  "DeleteOnTermination": True,
                  "VolumeType": "io1",
                  "VolumeSize": 250,
                  "Iops": 4800,
                  #"VolumeType": "gp2"
                        },
                    },
                ],
                'NetworkInterfaces': [
                    {
                        'DeviceIndex': 0,
                        'SubnetId': os.environ['subnet'],
                        'DeleteOnTermination': True,
                        'Groups': [
                            os.environ['sg'],
                        ]
                    },
                    {
                        'DeviceIndex': 1,
                        'SubnetId': os.environ['subnet'],
                        'DeleteOnTermination': True,
                        'Groups': [
                            os.environ['sg'],
                        ]
                    }

                ],
                'UserData': b64encode(data.encode("ascii")).decode('ascii')
            }
        )
        spot_ids=[]

        for parameter in response['SpotInstanceRequests']:
            if 'SpotInstanceRequestId' in parameter.keys():
                    spot_ids.append(parameter['SpotInstanceRequestId'])

        for spot_id in spot_ids:
            
            if type_of_deployment == 'Primary':
                instance_name=self.config_spot['Instance_Name']+'-Primary'
            if type_of_deployment == 'Secondary':
                instance_name=self.config_spot['Instance_Name']+'-Secondary'+str(spot_ids.index(spot_id)+1)
            if type_of_deployment == 'Tertiary':
                instance_name=self.config_spot['Instance_Name']+'-Tertiary'+str(spot_ids.index(spot_id)+1)    
            
            flag=False
            while flag!=True:
                for attempt in range(10):
                    try:
                        response2 = client.describe_spot_instance_requests(SpotInstanceRequestIds=[spot_id])
                    except:
                        time.sleep(2)
                    else:
                        break
                for parameter in response2['SpotInstanceRequests']:

                    if 'Status' in parameter.keys():
                        try:
                            assert('bad-parameters' not in response2['SpotInstanceRequests'][0]['Status']['Code']),'Bad parameters'
                        except Exception as error:
                            #self.logger.info("Bad parameters in spot request. Trigger with a different AMI.")
                            #self.logger.error("raised : %s" %error)
                            raise error

                    if 'InstanceId' not in parameter.keys():
                        time.sleep(2)
                    else:
                        instance_id=parameter['InstanceId']
                        #self.logger.info(instance_id)
                        response_tag = client.create_tags(Resources=[instance_id],Tags=[{'Key': 'Name','Value': instance_name}, {'Key': 'dontStop','Value': str(self.config_spot['dontStop'])}, {'Key': 'dontTerminate','Value': str(self.config_spot['dontTerminate'])}])
                        #self.logger.info(response_tag)
                        flag=True

    def main(self):

        self.amiID = os.environ["amiID"]
        #Create Instances
        self.create_spot_instances(1,self.config_spot["Primary_Model"],'Primary')
        if int(self.config_spot["Number_of_Secondary_VMs""])>0:
            self.create_spot_instances(self.config_spot["Number_of_Secondary_VMs"],self.config_spot["Secondary_Model"],'Secondary')
        if int(self.config_spot["Number_of_Tertiary_VMs""])>0:
            self.create_spot_instances(self.config_spot["Number_of_Tertiary_VMs"],self.config_spot["Tertiary_Model"],'Tertiary')
        time.sleep(480)
  
create_spot_instances = AWSSpotCreation()
create_spot_instances.main()