// ⚠️ Only import superdomains.
import * as aws from "@cdktn/provider-aws";
import * as cdktn from "cdktn";
import * as service from "../../[service]";
import * as utils_aws from "../../utils/aws";
import * as utils_domain from "../../utils/domain";

/**
 * Region-stratum stacks.
 */
export const stacks = utils_domain.mapDomainStratumPaths(
	utils_domain.SERVICE_DOMAIN,
	utils_domain.DomainType.REGION,
	(domainPath): cdktn.TerraformStack => {
		const [, , region] = domainPath;
		// Stack IDs should be human-readable.
		const stack = new cdktn.TerraformStack(service.app, utils_domain.domainPathName(domainPath));
		service.addLocalBackend(stack);
		new aws.provider.AwsProvider(stack, "aws", {
			allowedAccountIds: [region.data.account],
			region: region.data.name,
		});
		return stack;
	},
);

export const dataBuckets = utils_domain.mapDomainStratumPaths(
	utils_domain.SERVICE_DOMAIN,
	utils_domain.DomainType.REGION,
	(domainPath): aws.s3Bucket.S3Bucket => {
		const tags = utils_aws.tags({
			domainPath,
			resource: "aws.s3.bucket.data",
		});
		const name = utils_aws.tagsToName(tags);
		return new aws.s3Bucket.S3Bucket(stacks(domainPath), name, {
			bucket: name,
			tags: tags,
		});
	},
);
