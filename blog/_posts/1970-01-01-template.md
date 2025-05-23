---
title: template/tester
---
# {{ page.title }}
{: #blog-header}

In infrastructure there's a term that gets thrown around a lot among SREs and Platform Engineers, "Sysadmin who codes". Often used in a somewhat derogatory way, it's presence is a strong indicator of how the DevOps community views ourselves and our roles - where we are and where we've come from.

The difference between an SRE and a "Sysadmin who codes" might not immediately be obvious, particularly to anyone not in our industry. After all, isn't that what Site Reliability Engineering is all about? Isn't that just what Google did? Hired Sysadmins who could code? Why would that be a bad thing? It's easy to see how the narrative was formed, but the reality is that Google never did that. Instead, Google did the opposite. They hired Software Engineers and set them to working on their infrastructure. This (to some subtle) difference is responsible for arguably the biggest scism in our industry.

So what's the difference? In short, it's the approach and mindset, and to a smaller extent the skills and capabilities. "Sysadmins who code" often have a more process orientated mindset and a view to resolving problems using less abstract ways. Typically while they have the ability to write code, they lack any training and may find themselves unable to understand relatively basic algorithms and why they're used. In my experience, the code I've seen from these kinds of engineers is incredibly functional, but not particularly maintainable.

To give you an example, I once saw a script with upwards of 8 required arguments. Of course, most of these arguments were unnecessary, either because they could have some kind of default value set, or because they could be retrieved or determined logically. As an example, the script required a username that was always {env}_{db_name}. So a script that could have looked like `./run_some_automated_commands.sh database_name env`{: .highlight} became `./run_some_automated_commands.sh database_name env debug_mode username datacentre_name api_endpoint slack_channel`{: .highlight}


~~~go
Test of code
I just want to see how random code will appear
if err != nil {
    log.Error("This is an error")
}
~~~




A
