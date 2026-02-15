---
title: "Background"
sidebar_position: "1"
---

[vLLM](https://vllm.ai/) is a fast library for LLM inference and serving, and is widely used in the industry, and I have used it to deploy LLMs in production during my time at SAP.


vLLM was first known for efficient management of attention key and value memory with PagedAttention. PagedAttention is a memory allocation algorithm for the KV cache of the LLM that is inspired by traditional Operating Systems algorithms. I have read the PagedAttention paper and I would say it is a good read for people that would want to understand more about the KV cache memory allocation.


While vLLM primarily boasts state-of-the-art serving throughput, I decided to focus on reducing latency for time to first token during infernece instead.
