import * as cdktn from "cdktn";

/**
 * CDKTN application.
 */
export const app = new cdktn.App();

/**
 * Add a local backend.
 *
 * @param stack - Stack for the local backend. The stack's construct ID is used as the Terraform/OpenTofu state name.
 */
export function addLocalBackend(stack: cdktn.TerraformStack): cdktn.LocalBackend {
	return new cdktn.LocalBackend(stack, {
		path: `build/tfstate/${stack.node.id}.tfstate`,
	});
}
