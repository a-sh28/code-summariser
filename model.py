import pprint
import google.generativeai as palm


palm.configure(api_key='AIzaSyBos77hbBdG8OfZ5jMp51SzcZz4LsikS3A')
models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name
inputcode= '''
num = int(input("Enter a number: "))
if (num % 2) == 0:
   print("{0} is Even".format(num))
else:
   print("{0} is Odd".format(num))'''
prompt = '''Summarise the following code. It must be natural, useful and consistent. 
The summary's should be in bullet points and its length must be proportional to the input code length. 
It must only exaplain the logic of the code, not the program syntax and semantics{}'''.format(inputcode)


completion = palm.generate_text(
    model=model,
    prompt=prompt,
    temperature=0.99
)

print(type(completion.result))