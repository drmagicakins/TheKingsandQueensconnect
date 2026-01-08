
def award_credits(wallet, amount, max_balance=100):
    wallet.balance = min(wallet.balance + amount, max_balance)
    wallet.save()
