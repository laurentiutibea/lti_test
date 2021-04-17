import React, {Component} from "react";
import oauth from "oauth-sign";

import styles from "../styles/Home.module.css";

export default class Home extends Component {
	sendIFrameRequest = () => {
        const action = "---URL---";
        const method = "POST";
        const timestamp = Math.round(Date.now() / 1000);
        const params = {
            // LTI Required Parameters
            lti_message_type: "basic-lti-launch-request",
            lti_version: "LTI-1p0",
            resource_link_id: "---RESOURCE-LINK-ID---",
            // OAuth 1.0a Required Parameters
            oauth_consumer_key: "---CONSUMER KEY---",
            oauth_nonce: btoa(timestamp),
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: timestamp,
            oauth_version: "1.0"
        };
        const signature = oauth.hmacsign(method, action, params, "---SECRET---");
        params.oauth_signature = signature;
        const form = document.querySelector("#ltiForm");
        form.action = action;
        form.method = method;
        for (let name in params) {
            const node = document.createElement("input");
            node.name = name;
            node.type = "hidden";
            node.value = params[name];
            form.appendChild(node);
        }

        console.log(params)
        form.submit();
    }

	render(){
		return (
			<div className={styles.container}>
				<iframe name="ltiIframe" style={{height: 400, width: 600}}></iframe>
				<form id="ltiForm" target="ltiIframe"></form>
				<button onClick={this.sendIFrameRequest}>Submit</button>
			</div>
		)
	}
}
