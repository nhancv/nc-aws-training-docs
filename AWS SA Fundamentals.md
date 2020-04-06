AWS SA Fundamentals

Classles Inter-Domain Routing (CIDR)
Service control policies (SCPs)
AWS Organizations features:
- Consolidated billing
- Service control policies (SCPs)
- Account creation
- Simplified role switching

Amazon Machine Image (AMI)
Elastic Network Interface (ENI)
Virtual Private Cloud (VPC)
Elastic Block Store (EBS)
Network Access Control Lists (NACLs)
Network address translation (NAT)
Border Gateway Protocol (BGP)
Security Group (SG)
Internet Service Provider (ISP)
Domain name system (DNS)
Top-level domain (TLD)
FQDN: Fully qualified domain name ? the host and domains: www.linuxacademy.com.
S3 cross-region replication (S3 CRR) 
Standard Infrequent Access (Standard-IA)
Server-Side Encryption with Customer-Managed Keys (SSE-C)
Server-Side Encryption with S3-Managed Keys (SSE-S3)
Server-Side Encryption with AWSKMS-Managed Keys (SSE-KMS)
Cross-Origin Resource Sharing (CORS)
CloudFront is a content delivery network (CDN)
Origin access identity (OAI) 
Network File System (NFSv4)
Elastic File System (EFS)
Cross-Region Replication (CRR)
Relational database management systems (RDBMS)
ACID system: Atomicity, Consistency, Isolation, and Durability
RDS (Relational Database Service) is a Database as a Service (DBaaS) product
Recovery Point Objective (RPO)
Recovery Time Objective (RTO)
Aurora capacity units (ACUs)
Write capacity units (WCU)
Read capacity units (RCU)
local secondary indexes (LSI) and global secondary indexes (GSI).
DynamoDB Accelerator (DAX)
Elastic MapReduce (EMR)
Hadoop Distributed File System (HDFS)
OLTP (On-line transactional processing)
OLAP (On-line analytical processing)
Infrastructure as Code (IaC) 
lastic Load Balancing (ELB) 
Web Application Firewall (WAF)
Server Name Indication (SNI)
Transport Layer Security (TLS) 
Virtual Private Networks (VPNs) 
Virtual private gateway (VGW)
Direct Connect (DX)
Virtual interfaces (VIFs)
Border Gateway Protocol (BGP)
Database Migration Service (AWSDMS) 
Schema Conversion Tool (AWSSCT) 
Identity federation (IDF) 
Identity provider (IDP)





----
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

Instance types include: 
+ T2 and T3: Low-cost instance types that provide burst capability
+ M5: For general workloads
+ C4: Provides more capable CPU
+ X1 and R4: Optimize large amounts of fast memory
+ I3: Delivers fast IO
+ P2, G3, and F1: Deliver GPU and FPGAs

Instance sizes include nano, micro, small, medium, large, x.large, 2x.large, and larger.

Special Cases:
+ "a": Use AMD CPUs
+ "A": Arm based
+ "n": Higher speed networking
+ "d": NVMe storage

Meta-data url, using curl: 
http://169.254.169.254/latest/meta-data
+ Get AMI: /ami-id
+ Instance ID: /instance-id
+ Instance type: /instance-type

Volume Types
- sc1: Lowest cost, infrequent access, can't be boot volume
- st1: Low cost, throughput intensive, can't be boot volume
- gp2: Default, balance of IOPS/MiB/s - burst pool IOPS per GB
- io1: Highest performance, can adjust size and IOPS separately

What are the maximum IOPS for an EBS volume and EC2 Optimized instances?
=> 64,000 IOPS for EBS volumes and 80,000 IOPS for EC2 Optimized instances

Which instance type provides more CPU and belongs to the Compute Optimized family?
=> C3, C4, and C5

What is the naming convention for a private DNS of EC2 instances?
-> ip-x-x-x-x.ec2.internal

EC2 public: ec2-X-X-X-X.compute-1.amazonaws.com

How can you reduce the deployment time when creating hundreds of EC2 with the OS installations and configurations being static?
-> Bootstrapping

Which is not an image permission option when dealing with AMIs?
-> Privately shared but with blacklisting

Dedicated hosts are EC2 hosts - depending on the type and size.

The all upfront plan would be the most advantageous since the finance department has allocated a budget for at least a year.

When would you use Spot Instances?
-> When an EC2 instance's workload is non-mission critical and can tolerate interruptions.

Which Reserved Instance types charge an hourly rate?
-> Partial upfront, No upfront

When determining to use Spot Instances, what does the maximum price indicate?
-> The highest amount the customer is willing to pay for an EC2 instance

What is an implication of restoring from an EBS snapshot?
-> The new EBS volume will not immediately have maximum performance

Zonal reservations mean that you can reserve EC2 instances in a chosen Availablity Zone, which in this case, would fit our proximity needs. Most importantly, this choice locks you to one instance size.

What is the role of an API endpoint?
-> It's a location that can receive API requests.

Which is true of Lambda's runtime environment?
-> The Lambda environment is not persistent.

What is the longest runtime allowable on a state machine?
-> Up to 1 year

Open Systems Interconnection (OSI) layer 7 -> 1: Application -> Presentation -> Session -> Transport -> Network -> Data Link -> Physical
At Layer 1 (Physical), networks use a shared medium where devices can transmit signals and listen
Layer 2 (Data Link) adds MAC addresses (01-23-45-67-89-AB-CD-EF) that can be used for named communication between two devices on a local network.
The Network Layer (L3) allows for unique device-to-device communication over interconnected networks. L3 devices can pass packets over tens or even hundreds of L2 networks. 
L4 (Transport) adds TCP and UDP. TCP is designed for reliable transport,and UDPisaimed at speed.TCPusessegmentsto ensure data is received in the correct order and adds error checking and "ports," allowing different streams of communications to the same host (e.g., tcp/22 and tcp/80).
L5 (Session) adds the concept of sessions, so that request and reply communication streams are viewed as a single "session" of communication between client and server.
L6 (Present at ion) adds data conversion, encryption, compression, and standards that L7 can use. 
L7 (Applicat ion) is where protocols (such as HTTP, SSH, and FTP) are added. For example, HTTP (L7) running over TLS (L6) is HTTPS.
Class A (/8): 1.0.0.0 to 126.255.255.255 ? 126 networks, 16,777,214 nodes in each (+2 reserved)
Class B (/16): 128.0.0.0 to 191.255.255.255 ? 65,534 nodes in each (+2 reserved).
Class C (/24): 192.0.0.0 to 223.255.255.255 ? 254 nodes in each (+2 reserved)
IP classes have a number of ranges within them used for private networking only:
- 10.0.0.0 to 10.255.255.255: Private networking within the Class A range
- 172.16.0.0 to 172.31.255.255: Private networking within the Class B range (16 Class B networks)
- 192.168.0.0 to 192.168.255.255: Private networking within the Class C range (256 Class C networks)
Local device-to-device communication takes place using L1 (Physical) and L2 (Data Link) using MAC addresses and physical 0's and 1's.

How much bandwidth can a NAT gateway support?
-> Individual NAT gateways can handle 5 Gbps of bandwidth and can scale up to 45 Gbps.

Dynamic NATs should live in a (VPC + Public subnet)
What entities are included when a default VPC is created?
-> Security Group, DHCP, Public Subnet, An attached internet gateway, NACL

internet gateway (IGW) has to have routing rules added to the route table for resources in a public subnet to reach the internet, these rules are not automatically created.

Which rules are present in a default NACL?
-> Rule * which implicitly denies all traffic. 
-> Rule 100 which allows all traffic.

Which is the CIDR block address given when creating a default VPC?
-> 172.31.0.0/16

Which are reserved IPs within a subnet?
-> .0 Network, .1 Router, .2 DNS, .3 Future, .X Broadcast

You've set up a private EC2 instance to have limited outbound access to the internet by way of a NAT gateway. You ping a public IP from the private EC2 instance and receive a response. Why does the NAT gateway allow this inbound response?
-> NAT gateways understand and allow session traffic.

What characteristics are present when sharing subnets?
-> Other allowed AWS accounts can launch resources in a shared subnet.

Dynamic NATs are not highly available by nature. Architecturally, how can you create a highly available environment if a failure occurs in an Availability Zone?
-> create one Dynamic NAT per Availability Zones

When would it be appropriate to use Network ACLs?
-> when needing control access to a whole subnet + when needing to specifically deny certain traffic to a single IP or a range of IPs

VPC peers are used to link two VPCs at layer 3: company mergers,
shared services, company and vendor, auditing.
Network ACL place at layer 4 Transport while security group place at layer 5

VPCEndpoint Types:
- Gateway endpoints: Can be used for DynamoDB and S3
- Interface endpoints: Can be used for everything else (e.g., SNS, SQS)

What type of IP address can attach to an operating system?
-> IPv6

What option best describes what an Egress-Only Gateway is used for in a VPC?
-> IPv6 traffic from your instances to the Internet. Internet initiated traffic to those instances is blocked.

When would you use a VPC endpoint?
-> When a private subnet does not use a NAT but wants to reach a public endpoints
-> When a private instance wants to access a public AWS endpoint

When using VPC peering, which option would you enable for public DNS to private IP resolution?
-> Enable DNS settings in the Peer Connections menu to resolve public DNS to private IPs

Config ping between two instance inside public vpc via VPC peering: 
- Update Route Tables: add route with vpc peering connection type
- Update NACLs
- Update Security
- Do the same for both vpc

A health check can monitor the health of an HTTP or HTTPS page every 10 and 30 seconds
What is a name server?
-> name servers can be authoritative or non-authoritative
-> A server that runs a DNS service and can store or cache information for the DNS platform

Which record maps domain names to their IPv4 address?
-> A record

What does the period at the end of a FQDN signify?
-> The domain name is an absolute FQDN.

Which are default records of a zone?
-> NS + SOA

How frequently are you billed for Route 53 health checks?
-> Per month and are based on the number of checks within the month.

How many records of the same name does failover routing allow?
-> 2

What options are available when setting an A record?
-> Ip values + Routing policy + TTL

Which routing policy allows for multiple records of the same name that also perform health checks?
-> Multivalue Answer

S3 By default, replicated objects keep their: 
- Storage class
- Object name (key)
- Owner
- Object permissions

What statements are true of S3 Cross-Region Replication (CRR)?
-> It can change the ownership of objects and their storage tiers when going to the new region.

When would you use a bucket policy?
-> when granting bucket access to anonymous users
-> when granting bucket access to IAM identities in a different AWS account

What are the benefits of lifecycle rules?
-> an automated way of moving objects between storage classes
-> automatic deletion of objects

S3 Transfer Acceleration enables fast, easy, and secure transfers of files over long distances between your client and an S3 bucket.

S3 lifecycle rules can apply to:
-> tags for buckets or objects
-> prefix for buckets or objects
-> buckets
-> current or previous versions of an object

Pick the statements that are true of a S3 hosted website.
-> CORS should be enabled when one website references resource from another.
-> CloudFront can be used with S3.
-> Apache-like server access logs can be enabled.

Which is true of the CloudFront architecture?
-> An origin fetch occurs when an edge location and a regional edge cache do not have a copy of the requested content.
-> Edge locations first reach out to the regional cache for a copy of the content before performing an origin fetch.

Which S3 encryption type allows for role separation?
-> SSE-KMS

Architecturally, where do EFS mount targets sit?
-> Inside a subnet

Which RDS deployment method doesn't need network configuration between regions and will sync database instances asynchronously?
-> Read replica

Which RDS backup will remain even if the database is deleted?
-> Automated backups
-> Snapshot

Which action can be taken if an RDS master is reaching its writing capacity?
-> Scale the master vertically

Which are true statements of a database management system?
-> Database management systems contain storage, CPU, memory, and software used to manage data.
-> Database management systems is a platform designed to manage data.

A database's endpoint is:
-> also known as a database CNAME
-> A CNAME that can be used for the primary and standby instance during failover

Which tier in has the highest priority in an Aurora failover?
-> Tier 0

Which is true of Aurora's backtrack feature?
-> Backtrack allows you to roll back a database for up to 72 hours.
-> You don't have to make a new cluster when using Aurora's backtrack feature to restore a database.

What is the rate of billing for Aurora Serverless?
-> Charges are based on database resources used per second.

What is the maximum amount of replicas that Aurora can have?
-> 15

What are some limitations of using Aurora Serverless?
-> Slightly longer loading time when a database cluster is paused.
-> Slower failure switchover than Aurora Provisioned.
-> Not accessible via a VPN or an inter-region VPC peer.

What is a query editor?
-> a web-based tool that allows you to log in to the Aurora Serverless cluster and executes queries

What is a global database?
-> An Aurora provisioning option which adds resiliency by allowing you to pick amongst all AWS regions as your secondary reader cluster.

What is an Aurora Capacity Unit (ACU)?
-> A unit of measurement for processing (compute) and memory in Aurora Serverless.

GSIs can use a different ____ than the primary table. Please select the most appropriate answer.
-> WCU, partition keys, RCU, sort keys

Which are true statements of LSI (Local Secondary Indexes) in DynamoDB?
-> Have to be enabled when the table is created
-> Use a secondary sort key as an alternative way to view data in a table
-> Use the same RCU and WCU as the table that it indexes

Which is the maximum size for a DynamoDB Item and its attributes?
-> 400KB

Which are true statements of GSIs (Global Secondary Index) in DynamoDB?
-> GSI has asynchronous data from the table
-> GSIs can have their own WCU and RCU

Which situations would call for the use of DynamoDB?
-> When needing a web-scalable DBaaS product that provides integration with CloudWatch.
-> When needing a lightweight, on-demand database product

How many replicas does DynamoDB provide per table?
-> DynamoDB has more than 2 replicas in each Availability Zone.

One WCU is equal to _ of data when written to a table.
-> 1KB

The maximum amount of Global Secondary Indexes (GSI) per DynamoDB table is 20.

Partitions are replicated across 3 Availability Zones.

You can have up to 5 Local Secondary Indexes per table in DynamoDB.

How can you match DynamoDB's capacity with unpredictable traffic patterns to achieve maximum cost efficiency?
-> Enable auto-scaling for the DynamoDB tables

Partitions are replicated across 3 Availability Zones.

Which database can concurrently have multiple masters in multi-regions for reading and writing?
-> DynamoDB

Which are the characteristics of DynamoDB?
-> tables have an assigned ARN
-> it is a regional service

In DynamoDB, which term describes a collection of attributes located inside a table?
-> item

Which service allows asynchronous messaging, the decoupling of application components, and provides the ability to scale different parts of an application?
-> SQS

To access the SNS service from inside a VPC, you would need:
-> NAT Gateway
-> IGW
-> VPC endpoint

What information is necessary to delete a message in an SQS queue?
-> Receipt handle
-> The queue URL

What is the difference between Kinesis and SQS?
-> Kinesis is used for large scale, real-time streaming while SQS is used for messaging.
-> Kinesis uses streams and records to store data in, while SQS stores data in messages.
-> Kinesis Streams are deleted based on their rolling retention window, while SQS messages should be deleted once consumed to avoid re-polling.

When would you use Athena?
-> large resource-intensive queries
-> when needing to project your schema onto your S3 data at the time you execute a query
-> ad-hoc queries to S3 that happen once a month or once a week

When would you use Redshift?
-> When needing an end-state repository for processed data.
-> For scaling to unlimited load levels while storing petabytes worth of data.

Which are true of CloudWatch?
-> CloudWatch produces metrics which is a time-ordered set of data points.
-> CloudWatch metrics can be configured with alarms to take action.
-> CloudWatch is a repository service for metric data.

What data does CloudWatch monitor by default?
-> DynamoDB writes and reads
-> EBS volume writes and reads
-> EC2s Network usage
-> EC2 CPU usage
CloudWatch doesn't measure internal metrics. A CloudWatch agent must be added to the EC2 to monitor its memory.

What permits a service to write logs to CloudWatch Logs?
-> execution roles or permission roles

A CloudWatch log group:
-> can export and set streams into other AWS services.
-> is where you can set the retention period.
-> is where you set a metric filter.

Which OpsWorks stack allows you to use both Linux and Windows-based operating systems?
-> Chef 12 stack

What are the characteristics of a DEK?
-> DEKs are issued upon request.
-> DEKs are generated using a CMK.

What are the key architecture components within Elastic Beanstalk?
-> an environment
-> an application
-> an application version














