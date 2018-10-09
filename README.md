# Tap A Tune 🎵 🎵 🎵
Tap out a tune with Alexa and Echo buttons.

# How to play
TBA


## Try it for yourself
The Alexa Skill can be [enabled here](#). The skill requires a minimum of two [Echo buttons](https://www.amazon.com/Echo-Buttons-Pack-gaming-companion/dp/B072C4KCQH) but is more fun with four!


## Development
### Pre-requisites

* Node.js (> v8.9)
* Register for an [AWS Account](https://aws.amazon.com/)
* Install and Setup [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
  - Easiest way to install `brew install awscli`
* Configure a named [AWS CLI Profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)
* Register for an [Amazon Developer Account](https://developer.amazon.com/)
* Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

**Note** This skill requires a NodeJS 8.10 or newer runtime. When deploying to Lambda, make sure the selected runtime is Node JS 8.10!

### Installation

The following instructions show how to get this skill deployed using the ASK CLI. If you would prefer to view instructions for how to perform the same steps using the Web UIs, please foolow the instruction in [this guide](instructions/3-deployment-web.md).

1. Get a local copy of the Tap-a-Tune skill code from [tap-a-tune](https://github.com/LameLab/tap-a-tune.git) GitHub. You may clone the repository locally, or simply download and unzip the sample code from GitHub.

	```bash
	git clone https://github.com/LameLab/tap-a-tune.git/
	```

2. Initialize the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) by Navigating into the repository and running the command: `ask init` and create a new profile called `tap-a-tune`. Follow the prompts to configure the profile and associate it with one of your [AWS profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)

	```bash
	cd tap-a-tune
	ask init -p tap-a-tune
	```

3. Install npm dependencies by navigating into the `/lambda/custom` directory and running the npm command: `npm install`

	```bash
	cd lambda/custom
	npm install
	```

### Update Lambda Role for DynamoDB Access to Store Player and Game Attributes

1. Click **Services** at the top of the screen, and type "IAM" in the search box, and then press enter.

2. Click **Roles** in the left hand navigation of the IAM Dashboard.

3. Click the role you created above, **lambda_basic_execution**, then click the **Attach Policies** button.

4. In the serch box type "Dynamo" and then select the checkbox next to **AmazonDynamoDBFullAccess**. Click the **Attach Policy** button.


### Deployment

ASK CLI will create the skill and the lambda function for you. The Lambda function will be created in the region associated with the AWS profile that you selected.

1. Deploy the skill and the lambda function in one step by running the following command:

	```bash
	ask deploy -p tap-a-tune
	```

	**Note** This skill requires a NodeJS 8.10 or newer runtime. When deploying to Lambda, make sure the selected runtime is Node JS 8.10! At this time, the ASK CLI does not have an option to specify the Lambda runtime version so you will have to make the change manually in the AWS Lambda Console.


### Post deployment setup
1.  Go to **[AWS](https://aws.amazon.com)** and sign in to the console. If you don't already have an account, you will need to create one.  [If you don't have an AWS account, check out this quick walkthrough for setting it up](https://github.com/alexa/alexa-cookbook/blob/master/guides/aws-security-and-setup/set-up-aws.md).

2.  Click **Services** at the top of the screen, and type "Lambda" in the search box.  You can also find Lambda in the list of services.  It is in the "Compute" section.

3.  Select the lambda function `ask-custom-tap_a_tune-tap-a-tune
`, add environment variables called:
	- 'DYNAMODB_TABLE_NAME', with value 'tap-a-tune-sessions'



### Testing

1. To test, you need to login to Alexa Developer Console, and enable the "Test" switch on your skill from the "Test" Tab.

2. Simulate verbal interaction with your skill through the command line using the following example:

	```bash
	 ask simulate -l en-US -p tap-a-tune -t "alexa, open tap a tune"

	 ✓ Simulation created for simulation id: 8a5b18dc-24b9-04c0-d3bb-7b63d9887faf
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. Once the "Test" switch is enabled, your skill can be tested on devices associated with the developer account as well. Speak to Alexa from any enabled device, from your browser at [echosim.io](https://echosim.io/welcome), or through your Amazon Mobile App and say :

	```text
	Alexa, open tap a tune
	```

## Customization

1. ```./skill.json```

   Change the skill name, example phrase, icons, testing instructions etc ...

   Remember that many information is locale-specific and must be changed for each locale (en-GB and en-US)

   See the Skill [Manifest Documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html) for more information.

2. ```./lambda/custom/*```

   Modify the skill logic

3. ```./models/*.json```

	Change the model definition to replace the invocation name and the sample phrase for each intent.  Repeat the operation for each locale you are planning to support.


## Preview
TBA
