;; Title: MultiSafe sip-010 fungible token transfer executor
;; Author: Talha Bugra Bulut & Trust Machiness

(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.traits.executor-trait)
(use-trait safe-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.traits.safe-trait)
(use-trait nft-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.traits.sip-009-trait)
(use-trait ft-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.traits.sip-010-trait)

(define-public (execute (safe <safe-trait>) (param-ft <ft-trait>) (param-nft <nft-trait>) (param-p (optional principal)) (param-u (optional uint)) (param-b (optional (buff 20))))
        (contract-call? param-ft transfer (unwrap! param-u (err u9999)) (contract-of safe) (unwrap! param-p (err u9999)) param-b)
)