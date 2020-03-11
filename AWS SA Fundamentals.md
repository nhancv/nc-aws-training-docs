AWS SA Fundamentals
Shared Responsibility Model: 
+ Customer: Customer Data, Platform, Application, IAM, OS, Network and Firewall Configuration, Encryption at rest and in Transit, Network Protection => Security IN the cloud
+ AWS: Software, Compute, Storage, Database, Network, Hardware, AWS Global Infrastructure, Regions, Availability Zones, Edge Locations => Security OF the Cloud

High Availability: Hardware, software, and configuration allowing a system to recover quickly in the event of a failure
Fault Tolerance: System designed to operate through a failure with no user impact. More expensive and complex to achieve
Recovery Point Objective (RPO): How much a business can tolerate to lose, expressed in time. The maximum time between a failure and the last successful backup.
Recovery Time Objective (RTO): The maximum amount of time a system can be down. How long a solution takes to recover.

Vertical scaling is achieved by adding additional resources in the form of CPU or memory to an existing machine. By doing so, the machine is able to service additional customers or perform compute tasks quicker. Eventually, maximum machine sizes will constrain your ability to scale - either technically or from a cost perspective
Horizontal Scaling is achieved by adding additional machines into a pool of resources, each of which provides the same service. Horizontal scaling suffers none of the size limitations of vertical scaling and can scale to nearly infinite levels but requires application support to scale effectively.

AWS Global Cloud infrastructure: https://infrastructure.aws/
+ Regions: 22 geographic regions, connected to the global network with a 100 GBPS intercontinental network, consist of multiple Availability Zones, each of which is a fully isolated partition
+ Availability Zones: It is physically separate from any other Availability Zone
+ Local Zones: is an extension of an AWS Region that places AWS compute, storage, database, and other services closer to large population, industry and IT centers.
+ Points of Presence (PoP): consists of Edge Locations and Regional Edge Cache servers.
+ Network: interconnects our datacenters and Regions is automatically encrypted at the physical layer. The network is designed to be highly redundant, has no single points of failure and is designed to survive many concurrent link failures. Companies can connect their existing data centers or offices to the AWS network by using AWS Direct Connect to make it easy to establish a direct, dedicated network connection to AWS.

AWS Well-Architected Framework: https://d1.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf

AWS S3 is an object storage, now supports Same-Region Replication.
+ Region: [Bucket, Bucket, ...]
+ Bucket: [Object, Object, ...]
+ Object: [Similar to a file + Has a key & value + Size from 0 -> 5TB + Unique name]

CloudFormation template example: https://github.com/linuxacademy/content-aws-csa2019/tree/master/lab_files/01_aws_sa_fundamentals/getting_started_with_cfn
A list of AWS resources: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html

