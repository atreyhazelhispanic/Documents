import _ from 'lodash';


export function getClaims(profile){
        const namespace = 'https://claims.nordstrom.com/nauth/';
        const keys = _.keys(profile);
        const claims = {};
        
        _.each(keys, function(k){
            if(k.startsWith(namespace)){
                const newClaim = k.split(namespace)[1];
                claims[newClaim] = profile[k];
            }else{
                claims[k] = profile[k];
            }
        });
        return claims;
}