Gallery = function(apiLocation, apiKey, apiSecret) {
    //this.apiKey = apiKey;
    this.apiKey = "8D5E9BF2BA11F6Fc91b2bfc9b4b3f2a42476df88bf8bf1f09ec13c0";
    //this.apiSecret = apiSecret;
    this.apiSecret = "aea3dc554808858cf5895c557d90ba2cbd622b698d3e18101ebe311bf6a15faf";
    //this.apiLocation = apiLocation;
    this.apiLocation = "http://localhost:80/gallery/api/v1";

    this.getSubscriptionWorkflows = function (success, error){
        var type = "GET",
            url = this.apiLocation + "/workflows/subscription/",
            params = buildOauthParams(this.apiKey),
        //add any user parameters before generating the signature
            signature = generateSignature(type, url, params, this.apiSecret);
        $.extend(params, {oauth_signature: signature});
        $.ajax({
            type: type,
            url: url,
            data: params,
            success: success,
            error: error
        });
    };

    this.getAppQuestions = function (id, success, error){
        var type = "GET",
            url = this.apiLocation + "/workflows/" + id + "/questions/",
            params = buildOauthParams(this.apiKey),
            signature = generateSignature(type, url, params, this.apiSecret);
        $.extend(params, {oauth_signature: signature});
        $.ajax({
            type: type,
            url: url,
            data: params,
            success: success,
            error: error
        });
    };

    this.executeWorkflow = function(id, questions, success, error){
        var type = "POST",
            url = this.apiLocation + "/workflows/" + id + "/jobs/",
            params = buildOauthParams(this.apiKey);
        var signature = generateSignature(type, url, params, this.apiSecret);
        $.extend(params, {oauth_signature: signature});
        $.ajax({
            type: type,
            url: url + "?" + $.param(params),
            data: JSON.stringify({questions: questions}),
            success: success,
            error: error,
            contentType: "application/json"
        });
    };

    this.getJobsByWorkflow = function(id, success, error){
        var type = "GET",
            url = this.apiLocation + "/workflows/" + id + "/jobs/",
            params = buildOauthParams(this.apiKey),
            signature = generateSignature(type, url, params, this.apiSecret);
        $.extend(params, {oauth_signature: signature});
        $.ajax({
            type: type,
            url: url,
            data: params,
            success: success,
            error: error
        });
    };

    this.getJob = function(id, success, error) {
        var type = "GET",
            url = this.apiLocation + "/jobs/" + id + "/",
            params = buildOauthParams(this.apiKey),
            signature = generateSignature(type, url, params, this.apiSecret);
        $.extend(params, {oauth_signature: signature});
        $.ajax({
            type: type,
            url: url,
            data: params,
            success: success,
            error: error
        });
    };

    this.getOutputFileURL = function(jobId, outputId, format) {
        var type = "GET",
            url = this.apiLocation + "/jobs/" + jobId + "/output/" + outputId + "/",
            params = buildOauthParams(this.apiKey);
        $.extend(params, {format: format || "Raw"});
        var signature = generateSignature(type, url, params, this.apiSecret);
        $.extend(params, {oauth_signature: signature});
        return url + "?" + $.param(params);
    };

    var buildOauthParams = function(apiKey){
        return {
            oauth_consumer_key: apiKey,
            oauth_signature_method: "HMAC-SHA1",
            oauth_nonce: Math.floor(Math.random() * 1e9).toString(),
            oauth_timestamp: Math.floor(new Date().getTime()/1000).toString(),
            oauth_version: "1.0"
        };
    };

    var generateSignature = function(httpMethod, url, parameters, secret) {
        return oauthSignature.generate(httpMethod, url, parameters, secret, null, { encodeSignature: false});
    };
};
